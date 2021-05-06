<?php
/* --------------------------------------------------------------
   function.cart_products_qty.php 2017-09-19
   Gambio GmbH
   http://www.gambio.de
   Copyright (c) 2017 Gambio GmbH
   Released under the GNU General Public License (Version 2)
   [http://www.gnu.org/licenses/gpl-2.0.html]
   --------------------------------------------------------------
*/
function smarty_function_cart_products_qty($params, &$smarty)
{
	$result = 0;
	
	if(gm_get_conf('SHOW_PRODUCTS_COUNT') === 'true')
	{
		$result = count($_SESSION['cart']->contents);
	}
	else
	{
		foreach($_SESSION['cart']->contents as $content)
		{
			$result += $content['qty'];
		}
	}
	
	$smarty->assign($params['out'], $result);
}