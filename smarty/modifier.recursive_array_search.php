<?php
/* --------------------------------------------------------------
   modifier.detect_page.php 2018-04-24 tw@gambio
   Gambio GmbH
   http://www.gambio.de
   Copyright (c) 2018 Gambio GmbH
   Released under the GNU General Public License (Version 2)
   [http://www.gnu.org/licenses/gpl-2.0.html]
   --------------------------------------------------------------
*/

function smarty_modifier_recursive_array_search($haystack, $needle)
{
    $haystack = (array) $haystack;
    
	foreach($haystack as $key => $value)
	{
		$current_key = $key;
		
		if($needle === $value || (is_array($value)
		                          && smarty_modifier_recursive_array_search($value, $needle) !== false)
		)
		{
			return $current_key;
		}
	}
	
	return false;
}