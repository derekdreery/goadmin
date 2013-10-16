#!/usr/bin/env python

# -*- coding: utf-8 -*-

"""
Usage: goadmin.py [-h] modulename

Creates a skeleton groupoffice module

"""

from argparse import ArgumentParser
from jinja2 import Environment, PackageLoader
import os
import pwd

if __name__ == "__main__":

	env = Environment(loader=PackageLoader('goadmin', 'templates'))
	parser = ArgumentParser(description="Administrative functions for " + 
	        "groupoffice (currently limited to creating new modules)")
	parser.add_argument('modulename')
	name = parser.parse_args().modulename
	
	# Get username on unix
	user = (pwd.getpwuid(os.getuid())[4]).split(',')
	username = user[0]
	
	# Create directory structure
	os.mkdir(name)
	os.chdir(name)
	
	os.mkdir('install')
	os.mkdir('controller')
	os.mkdir('language')
	os.mkdir('model')
	os.mkdir('views')
	os.mkdir(os.path.join('views', 'Extjs3'))
	
	module_template = env.get_template('NameModule.php')
	module_file_contents = module_template.render(name=name, username=username)
	with open(name.capitalize() + 'Module.php', 'w') as f:
		f.write(module_file_contents)
	
	main_panel_template = env.get_template('MainPanel.js')
	main_panel_file_contents = main_panel_template.render(name=name)
	with open(os.path.join('views', 'Extjs3', 'MainPanel.js'), 'w') as f:
		f.write(main_panel_file_contents)
		
	scripts_template = env.get_template('scripts.txt')
	scripts_file_contents = scripts_template.render(name=name)
	with open(os.path.join('views', 'Extjs3', 'scripts.txt'), 'w') as f:
		f.write(scripts_file_contents)
		
	language_template = env.get_template('en.php')
	language_file_contents = language_template.render(name=name)
	with open(os.path.join('language', 'en.php'), 'w') as f:
		f.write(language_file_contents)
    
