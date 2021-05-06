<?php
/* --------------------------------------------------------------
   function.url_param_to_hidden_fields.php 2017-11-23
   Gambio GmbH
   http://www.gambio.de
   Copyright (c) 2017 Gambio GmbH
   Released under the GNU General Public License (Version 2)
   [http://www.gnu.org/licenses/gpl-2.0.html]
   --------------------------------------------------------------
*/

function smarty_function_url_param_to_hidden_fields($params, &$smarty)
{
	$return = '';

	$excludeParams = array(
		'language',
		'currency',
		'switch_country',
		'gm_boosted_category',
		'gm_boosted_content',
		'gm_boosted_product',
	);

	if(gm_get_conf('GM_SEO_BOOST_CATEGORIES') == 'true')
	{
		$excludeParams = array_merge($excludeParams,array('cat','cPath'));

	}
	if(gm_get_conf('GM_SEO_BOOST_PRODUCTS') == 'true')
	{
		$excludeParams = array_merge($excludeParams,array('products_id'));
	}
	if(gm_get_conf('GM_SEO_BOOST_CONTENT') == 'true')
	{
		$excludeParams = array_merge($excludeParams,array('coID'));
	}

	$paramsString = xtc_get_all_get_params($excludeParams);

	$paramsArray = explode('&', $paramsString);

	foreach($paramsArray as $param)
	{
		if(empty($param))
		{
			continue;
		}
		
		$hiddenFieldData = explode('=', $param);
		$hiddenField = '<input type="hidden" name="' . $hiddenFieldData[0] . '" value="' . $hiddenFieldData[1] . '"/>';
		$return .= $hiddenField;
	}

	return $return;
}