<?php
/* --------------------------------------------------------------
   gm_dynamic.css.php 2018-08-09
   Gambio GmbH
   http://www.gambio.de
   Copyright (c) 2018 Gambio GmbH
   Released under the GNU General Public License (Version 2)
   [http://www.gnu.org/licenses/gpl-2.0.html]
   --------------------------------------------------------------
*/

chdir('../../');

error_reporting(
		E_ALL
		& ~E_NOTICE
		& ~E_DEPRECATED
		& ~E_STRICT
		& ~E_CORE_ERROR
		& ~E_CORE_WARNING
);

@date_default_timezone_set('Europe/Berlin');

function set_memory_limit($limitInMegaBytes = 256)
{
	$minMemoryLimitGiven = false;
	$minMemoryLimit      = (string)$limitInMegaBytes . 'M';
	
	if(function_exists('ini_get') && function_exists('ini_set'))
	{
		$serverMemoryLimit = @ini_get('memory_limit');
		
		if(preg_match('/[\d]+M/', (string)$serverMemoryLimit))
		{
			$memoryLimit = (int)substr($serverMemoryLimit, 0, -1);
			if($memoryLimit < $limitInMegaBytes)
			{
				@ini_set('memory_limit', $minMemoryLimit);
				if(@ini_get('memory_limit') === $minMemoryLimit)
				{
					$minMemoryLimitGiven = true;
				}
			}
			else
			{
				$minMemoryLimitGiven = true;
			}
		}
		elseif(preg_match('/^[\d]+$/', (string)$serverMemoryLimit))
		{
			$memoryLimit    = (int)$serverMemoryLimit;
			$minMemoryLimit = $limitInMegaBytes * 1024 * 1024;
			
			if($memoryLimit < $minMemoryLimit)
			{
				@ini_set('memory_limit', $minMemoryLimit);
				if(@ini_get('memory_limit') === $minMemoryLimit)
				{
					$minMemoryLimitGiven = true;
				}
			}
			else
			{
				$minMemoryLimitGiven = true;
			}
		}
	}
	
	return $minMemoryLimitGiven;
}

set_memory_limit();

header('Content-Type: text/css; charset=utf-8');

$scriptError = '';

function cssErrorHandler($errno , $errstr, $errfile, $errline, array $errcontext)
{
	if(!(error_reporting() & $errno))
	{
        // This error code is not included in error_reporting
        return;
    }

	$GLOBALS['scriptError'] .= str_replace('"', '\"', "[CSS compile error] '$errstr' in $errfile:$errline ");

	echo 'body:before { 
				content: "' . $GLOBALS['scriptError'] . '"; 
				position: absolute; 
				background: #FF5722; 
				color: #fff;
				top: 0;
				left: 0;
				z-index: 100000;
				padding: 15px;
			}';

    /* Don't execute PHP internal error handler */
    return true;
}

set_error_handler('cssErrorHandler');

if(file_exists('includes/local/configure.php'))
{
	include_once 'includes/local/configure.php';
}
else
{
	include_once 'includes/configure.php';
}

# Include some files for GXModulesCache
require_once(DIR_FS_CATALOG . 'system/core/logging/LogControl.inc.php');
require_once(DIR_FS_CATALOG.'system/core/caching/DataCache.inc.php');
require_once(DIR_FS_CATALOG.'system/core/caching/GXModulesCache.inc.php');

// Include class for google font download
require_once(DIR_FS_CATALOG.'system/core/GoogleFontDownloader.inc.php');

$currentTemplate = basename(__DIR__);
if(isset($_GET['current_template']) 
	&& !empty($_GET['current_template'])
	&& is_dir(DIR_FS_CATALOG . 'templates/' . basename($_GET['current_template']) . '/usermod'))
{
	$currentTemplate = basename($_GET['current_template']);
}

$suffix = '.min';
if(file_exists(DIR_FS_CATALOG . '.dev-environment'))
{
	$suffix = '';
}

$additionalCssFiles  = array();
$additionalScssFiles = array();
$additionalScssPaths = array();

if(file_exists(DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/stylesheet.css'))
{
	$additionalCssFiles[] = DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/stylesheet.css';
}

$pathPattern = DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/usermod/css/*.css';

$usermodPaths = glob($pathPattern);
if(is_array($usermodPaths))
{
	foreach($usermodPaths as $result)
	{
		$usermodFile = basename($result);

		$additionalCssFiles[] = DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/usermod/css/' . $usermodFile;
	}
}

if(file_exists(DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/assets/styles/vendor' . $suffix . '.css'))
{
	$additionalCssFiles[] = DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/assets/styles/vendor' . $suffix . '.css';
}

if(file_exists(DIR_FS_CATALOG . 'JSEngine/build/vendor' . $suffix . '.css'))
{
	$additionalCssFiles[] = DIR_FS_CATALOG . 'JSEngine/build/vendor' . $suffix . '.css';
}

if(file_exists(DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/assets/styles/vendor_fixes.css'))
{
	$additionalCssFiles[] = DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/assets/styles/vendor_fixes.css';
}

$gxModulesFiles = GXModulesCache::getInstalledModuleFiles();
foreach($gxModulesFiles as $file)
{
	if(stripos($file, '/Templates/' . $currentTemplate . '/Css/') !== false
		|| stripos($file, '/Templates/All/Css/') !== false)
	{
		if(substr($file, -4) === '.css')
		{
			$additionalCssFiles[] = $file;
		}
		elseif(substr($file, -9) === 'main.scss')
		{
			$additionalScssFiles[] = $file;
			$additionalScssPaths[] = substr(substr($file, 0, strripos($file, '/')), strlen(DIR_FS_CATALOG));
		}
	}
}
$additionalScssFiles = array_unique($additionalScssFiles);
$additionalScssPaths = array_unique($additionalScssPaths);

$cacheFile = DIR_FS_CATALOG . 'cache/' . (!array_key_exists('style_edit_cache', $_GET)  
	?  '__dynamics.css' : '__dynamics_style_edit.css');

if(isset($_GET['style_name']) 
	&& file_exists('StyleEdit3/bootstrap.inc.php')
	&& file_exists('StyleEdit3/templates/' . $currentTemplate))
{
	try
	{
		include_once 'StyleEdit3/bootstrap.inc.php';
		
		if(\StyleEdit\Authentication::isAuthenticated())
		{
			$cacheFile = DIR_FS_CATALOG . 'cache/__dynamics-' . md5($_GET['style_name']) . '.css';
		}
	}
	catch(\Exception $e)
	{
		// go on without StyleEdit
	}
}

$createCache = false;
if($_GET['renew_cache'] === '1' || !file_exists($cacheFile) || filesize($cacheFile) < 10)
{
	$createCache = true;
}

function getFilemtime($p_file)
{
	$lastModified = filemtime($p_file);

	// Windows time fix
	if(date('I', $lastModified) != 1 && date('I') == 1)
	{
		$lastModified += 3600;
	}
	elseif(date('I', $lastModified) == 1 && date('I') != 1)
	{
		$lastModified -= 3600;
	}
	
	return $lastModified;
}

if($createCache === false)
{
	ob_start();

	foreach($additionalCssFiles as $file)
	{
		include $file;

		// print comment to close unclosed comment in included file
		echo "\n/**/\n";
	}

	$additionalCss = ob_get_clean();

	if($suffix === '.min')
	{
		$filters= array(
			'ImportImports'                 => false,
			'RemoveComments'                => true,
			'RemoveEmptyRulesets'           => true,
			'RemoveEmptyAtBlocks'           => true,
			'ConvertLevel3AtKeyframes'      => false,
			'ConvertLevel3Properties'       => false,
			'Variables'                     => true,
			'RemoveLastDelarationSemiColon' => true
		);

		$plugins = array(
			'Variables'                     => true,
			'ConvertFontWeight'             => true,
			'ConvertHslColors'              => true,
			'ConvertRgbColors'              => true,
			'ConvertNamedColors'            => true,
			'CompressColorValues'           => true,
			'CompressUnitValues'            => true,
			'CompressExpressionValues'      => true
		);

		include_once 'vendor/natxet/CssMin/src/CssMin.php';

		$minifier      = new CssMinifier($additionalCss, $filters, $plugins);
		$additionalCss = $minifier->getMinified();
	}

	include $cacheFile;

	echo $additionalCss;
}
else
{
	$css = '';
	
	include_once 'includes/classes/scssphp/scss.inc.php';
	
	$_GET['p'] = 'main.scss';                     // Default file name of the entry point scss
	$basePath  = 'templates/' . $currentTemplate . '/styles/';  // Default theme directory
	
	$pathPattern = DIR_FS_CATALOG . 'cache/*.css*';

	$cachePaths = glob($pathPattern);
	if(is_array($cachePaths))
	{
		foreach($cachePaths as $result)
		{
			if(strpos($result, '__dynamic') === false)
			{
				unlink($result);
			}
		}
	}
	
	if(file_exists($cacheFile))
	{
		@unlink($cacheFile);
	}
	
	$error                 = false;
	$errorMessage          = '';
	$styleEditErrorMessage = '';
	
	if(file_exists('StyleEdit3/bootstrap.inc.php')
		&& file_exists('StyleEdit3/templates/' . $currentTemplate))
	{
		try
		{
			include_once 'StyleEdit3/bootstrap.inc.php';
		
			if(class_exists('\StyleEdit\StyleConfigReader'))
			{
				$styleName             = isset($_GET['style_name']) ? $_GET['style_name'] : null;
				$styleConfigReader     = \StyleEdit\StyleConfigReader::getInstance($currentTemplate, $styleName);
				$bootstrapScss         = $styleConfigReader->getScss('bootstrap', $styleName);
				$templateScss          = $styleConfigReader->getScss('template', $styleName);
				$customStylesScss      = $styleConfigReader->getCustomStyles($styleName);
				
				// Download google fonts and use the local fonts
				$fontUrl = $styleConfigReader->findSettingValueByName('gx-font-import-url');
				if(strpos($fontUrl, '"') === 0 || strpos($fontUrl, '\'') === 0)
				{
					$fontUrl = substr($fontUrl, 1, strlen($fontUrl) - 2);
				}
				if($fontUrl !== null &&
					(strpos($fontUrl, 'https://fonts.googleapis.com') !== false
				       || strpos($fontUrl, 'http://fonts.googleapis.com') !== false))
				{
					$fsLocalFont = DIR_FS_CATALOG . 'public/fonts/' . md5($fontUrl) . '.css';
					$wsLocalFont = '../../public/fonts/' . md5($fontUrl) . '.css'; # HTTP_SERVER . DIR_WS_CATALOG
					if(!file_exists($fsLocalFont))
					{
						$fontDownloader = new GoogleFontDownloader();
						$fontDownloader->downloadFont($fontUrl);
					} # no else if, just in case the download failed
					if(file_exists($fsLocalFont))
					{
						$templateScss .=  "\n\r" . '$gx-font-import-url: "' .$wsLocalFont. '";';
					}
				}
				
				if($styleConfigReader->getErrorMessage() !== '')
				{
					$styleEditErrorMessage = 'body:before { 
						content: "' . str_replace('"', '\"', $styleConfigReader->getErrorMessage()) . '"; 
						position: absolute; 
						background: white; 
						top: 0;
						left: 0;
						z-index: 100000;
					}';
				}
				
				$customDir = 'templates/' . $currentTemplate . '/styles/custom/';
				
				if(file_exists(DIR_FS_CATALOG . $customDir . '_usermod.scss'))
				{
					$customStylesScss .= "\n\n@import \"custom/usermod\";";
				}
				
				if(@file_put_contents(DIR_FS_CATALOG . $customDir . '_bootstrap_variables.scss', $bootstrapScss) === false)
				{
					$error = true;
				}
				
				if(@file_put_contents(DIR_FS_CATALOG . $customDir . '_template_variables.scss', $templateScss) === false)
				{
					$error = true;
				}
				
				if(@file_put_contents(DIR_FS_CATALOG . $customDir . '_custom_styles.scss', $customStylesScss) === false)
				{
					$error = true;
				}
				
				if($error)
				{
					$errorMessage = 'body:before { 
										content: "The directory ' . $customDir . ' and/or containing files are not writable. CSS cache file cannot be created causing slow page speed."; 
										position: absolute; 
										background: white; 
										top: 0;
										left: 0;
										z-index: 100000;
									}';
					
					$css .= $errorMessage;
				}
			}
			else
			{
				throw new \RuntimeException('Class \'StyleEdit\StyleConfigReader\' not found');
			}
		}
		catch(\Exception $e)
		{
			$error        = true;
			$errorMessage = 'body:before { 
								content: "' . str_replace('"', '\"', $e->getMessage()) . '"; 
								position: absolute; 
								background: white; 
								top: 0;
								left: 0;
								z-index: 100000;
							}';
		
			$css .= $errorMessage;
		}
	}
	else
	{
		$customDir = 'templates/' . $currentTemplate . '/styles/custom/';
				
		if(!file_exists(DIR_FS_CATALOG . $customDir . '_bootstrap_variables.scss'))
		{
			@file_put_contents(DIR_FS_CATALOG . $customDir . '_bootstrap_variables.scss', '');
		}
		
		if(!file_exists(DIR_FS_CATALOG . $customDir . '_template_variables.scss'))
		{
			@file_put_contents(DIR_FS_CATALOG . $customDir . '_template_variables.scss', '');
		}
		
		if(!file_exists(DIR_FS_CATALOG . $customDir . '_custom_styles.scss'))
		{
			$customStylesScss = '';
		
			if(file_exists(DIR_FS_CATALOG . $customDir . '_usermod.scss'))
			{
				$customStylesScss = "\n\n@import \"custom/usermod\";";
			}
		
			@file_put_contents(DIR_FS_CATALOG . $customDir . '_custom_styles.scss', $customStylesScss);
		}
		else
		{
			$customStylesScss = file_get_contents(DIR_FS_CATALOG . $customDir . '_custom_styles.scss');
			
			if(file_exists(DIR_FS_CATALOG . $customDir . '_usermod.scss'))
			{
				if(strpos($customStylesScss, '@import "custom/usermod";') === false)
				{
					$customStylesScss .= "\n\n@import \"custom/usermod\";";
					
					@file_put_contents(DIR_FS_CATALOG . $customDir . '_custom_styles.scss', $customStylesScss);
				}
			}
			elseif(strpos($customStylesScss, '@import "custom/usermod";') !== false)
			{
				$customStylesScss = str_replace('@import "custom/usermod";', '', $customStylesScss);
				
				@file_put_contents(DIR_FS_CATALOG . $customDir . '_custom_styles.scss', $customStylesScss);
			}
		}
	}

	// Serve CSS
	$compiler = new scssc();
	$compiler->addImportPath($basePath);
	if(count($additionalScssPaths) > 0)
	{
		foreach($additionalScssPaths as $additionalScssPath)
		{
			$compiler->addImportPath($additionalScssPath);
		}
	}

	if($suffix === '.min')
	{
		$compiler->setFormatter('scss_formatter_compressed');
	}
	else
	{
		$compiler->setFormatter('scss_formatter');
	}

	$server = new scss_server($basePath, 'cache', $compiler);
	$server->setAdditionalScssFiles($additionalScssFiles);
	ob_start();
	try
	{
		$server->serve();
	}
	catch(\Exception $e)
	{
		$errorMessage = 'body:before {
							content: "' . str_replace('"', '\"', $e->getMessage()) . '";
							position: absolute;
							background: white;
							top: 0;
							left: 0;
							z-index: 100000;
						}';
		
		echo $errorMessage . $styleEditErrorMessage;

		if(file_exists(DIR_FS_CATALOG . 'cache/__dynamics.css'))
		{
			echo file_get_contents(DIR_FS_CATALOG . 'cache/__dynamics.css');
		}

		$error = true;
	}

	$scss = ob_get_clean();

	if(strpos($scss, 'Parse error') === 0)
	{
		$errorMessage = 'body:before {
							content: "' . str_replace('"', '\"', str_replace("\n", ' ', str_replace("\r", '', $scss))) . '";
							position: absolute;
							background: white;
							top: 0;
							left: 0;
							z-index: 100000;
						}';

		$scss = $errorMessage . $styleEditErrorMessage;

		if(file_exists(DIR_FS_CATALOG . 'cache/__dynamics.css'))
		{
			$scss .= file_get_contents(DIR_FS_CATALOG . 'cache/__dynamics.css');
		}

		$error = true;
	}

	// compile default css in error case
	if($error)
	{
		ob_start();
	
		try
		{
			$compiler = new scssc();
			$compiler->addImportPath($basePath);
			if(count($additionalScssPaths) > 0)
			{
				foreach($additionalScssPaths as $additionalScssPath)
				{
					$compiler->addImportPath($additionalScssPath);
				}
			}
		
			if($suffix === '.min')
			{
				$compiler->setFormatter('scss_formatter_compressed');
			}
			else
			{
				$compiler->setFormatter('scss_formatter');
			}
		
			$server = new scss_server($basePath, 'cache', $compiler);
			$server->setAdditionalScssFiles($additionalScssFiles);
	
			// delete custom scss forcing to compile default css to ensure a working frontend
			@file_put_contents(DIR_FS_CATALOG . $customDir . '_bootstrap_variables.scss', '');
			@file_put_contents(DIR_FS_CATALOG . $customDir . '_template_variables.scss', '');
			@file_put_contents(DIR_FS_CATALOG . $customDir . '_custom_styles.scss', '');
			
			$server->serve();
			
			$scss  = ob_get_clean();
			$scss = $errorMessage . $styleEditErrorMessage . $scss;
		}
		catch(\Exception $e)
		{
			ob_clean();
		}
	}
	
	$css .= $scss;

	if(!$error && $scriptError === '')
	{
		if($suffix === '.min')
		{
			$css = preg_replace('!/\*.*?\*/!s', '', $css);
		}
		
		file_put_contents($cacheFile, $css);
	}

	header('HTTP/1.1 200 OK');

	ob_start();

	foreach($additionalCssFiles as $file)
	{
		include $file;

		// print comment to close unclosed comment in included file
		echo "\n/**/\n";
	}

	$additionalCss = ob_get_clean();

	if($suffix === '.min')
	{
		$filters= array(
			'ImportImports'                 => false,
			'RemoveComments'                => true,
			'RemoveEmptyRulesets'           => true,
			'RemoveEmptyAtBlocks'           => true,
			'ConvertLevel3AtKeyframes'      => false,
			'ConvertLevel3Properties'       => false,
			'Variables'                     => true,
			'RemoveLastDelarationSemiColon' => true
		);

		$plugins = array(
			'Variables'                     => true,
			'ConvertFontWeight'             => true,
			'ConvertHslColors'              => true,
			'ConvertRgbColors'              => true,
			'ConvertNamedColors'            => true,
			'CompressColorValues'           => true,
			'CompressUnitValues'            => true,
			'CompressExpressionValues'      => true
		);

		include_once 'vendor/natxet/CssMin/src/CssMin.php';

		$minifier      = new CssMinifier($additionalCss, $filters, $plugins);
		$additionalCss = $minifier->getMinified();
	}

	if(is_writable(DIR_FS_CATALOG . 'templates/' . $currentTemplate) && !isset($_GET['style_name']))
	{
		$mainCssPath = DIR_FS_CATALOG . 'templates/' . $currentTemplate . '/main' . $suffix . '.css';
		
		if(file_exists($mainCssPath))
		{
			unlink($mainCssPath);
		}
		
		file_put_contents($mainCssPath, $css . $additionalCss);
	}
	
	echo $css;
	echo $additionalCss;
}
