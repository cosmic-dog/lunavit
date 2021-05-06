<?php
/* --------------------------------------------------------------
   function.popuplink 2017-07-04
   Gambio GmbH
   http://www.gambio.de
   Copyright (c) 2016 Gambio GmbH
   Released under the GNU General Public License (Version 2)
   [http://www.gnu.org/licenses/gpl-2.0.html]
   --------------------------------------------------------------
*/

function smarty_function_popuplink($params, &$smarty)
{
	$seoBoost     = MainFactory::create_object('GMSEOBoost', [], true);
	$contentId    = $params['coID'];

	if($seoBoost->boost_content)
	{
		$contentId = $seoBoost->get_content_id_by_content_group($contentId);
		$urlWithoutPrefix = str_replace( 'info/', 'popup/', $seoBoost->get_boosted_content_url($contentId));

		return $urlWithoutPrefix;
	}
	
	$languageCode = '';
	if(gm_get_conf('USE_SEO_BOOST_LANGUAGE_CODE') === 'true')
	{
		$languageCode = strtolower($_SESSION['language_code']) . '/';
	}

	return $languageCode . 'popup_content.php?coID=' . $contentId; 
}
