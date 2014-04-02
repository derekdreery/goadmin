<?php

{{license}}

/**
 * The {{name}} model
 *
 * @author {{username}}
 */
class {{modulename|capitalize}}_Model_{{name|capitalize}} extends GO_Base_Db_ActiveRecord {

	/**
	* Returns a static model of itself
	* 
	* @param String $className
	* @return GO_{{modulename|capitalize}}_Model_{{name|capitalize}}
	*/
	public static function model($className = __CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return array An array of attributes for the model
	 */
	public function init() {
		// TODO set column properties e.g. $this->columns['date_start']['required']=true;
		
		parent::init();
	}

	/**
	 * @return the localized name of the model
	 */
	public function getLocalizedName() {
		return GO::t('{{name|lower}}', '{{modulename|lower}}');
	}

	/**
	 * @return string The name of the table in the db
	 */
	public function tableName() {
		return "{{modulename|lower}}_{{name|lower}}s";
	}

	/**
	 * @return array The relations to this model
	 */
	public function relations() {
		$rels = array(); // Insert relations here
		
		return array_merge(parent::relations(), $rels);
	}

	/**
	 * @return array The defaults for this model
	 */
	public function defaultAtributes() {
		$attrs = array(); // Insert default attributes here

		return array_merge(parent::defaultAttributes(), $attrs);
	}

	/**
	 * Get the cache attributes (identifiers for the models also
	 * used for logging)
	 * 
	 * @return array The name and description of the model
	 */
	public function getCacheAttributes() {
		return array(
			"name" => $this->id // TODO You will probably want to rewrite this
		);
	}
	
	/**
	 * Override this function to mutate attribute values on passthrough
	 * 
	 * @param $name string The name of the attribute ($this->name)
	 * @paramn $outputType {'formatted', 'raw'} Whether to format data or pass raw
	 * 
	 * @return mixed The attribute specified by $name
	 */
	public function getAttribute($name, $outputType='formatted') {
		$output = parent::getAttribute($name, $outputType);
		// TODO Mutate attribute here if necessary
		return $output;
	}
	
	/**
	 * Override this function to mutate attribute values before save, sister
	 * function of getAttribute (except we don't call parent here as this function
	 * is called from within save())
	 * 
	 * @return bool 'true' to proceed with db insert/update, false to bail out
	 */
	public function beforeSave() {
		return true;
	}

	// public functions
	// ================

	//TODO put any extra public functions of the model data here

	// private utility functions
	// =========================

	//TODO put any private functions used elsewhere in the model here

}

