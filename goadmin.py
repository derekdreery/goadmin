#!/usr/bin/env python

# -*- coding: utf-8 -*-

"""
Usage: goadmin.py [-h] modulename

Creates a skeleton groupoffice module

"""

import argparse
import jinja2 as jinja
import os
import pwd
import shutil
import string
import inflection

"""
For each pair in replacements, replace occurences in text of

"""
def multi_replace(text, replacements):
	for pair in replacements:
		text = string.replace(text, pair[0], pair[1])
	return text

if __name__ == "__main__":
	
	# Get script directory
	script_dir = os.path.dirname(os.path.abspath(__file__))
	
	# Get cmd args
	templates = os.listdir(os.path.join(script_dir, 'templates'))
	parser = argparse.ArgumentParser(description="Administrative functions for " + 
	        "groupoffice (currently limited to creating new modules)")
	parser.add_argument('modulename', help="the (singular) name of the new module")
	parser.add_argument('-t', '--template', help="the name of the template to use",
	                    required=True, choices=templates)
	parser.add_argument('-p', '--no-pluralize', help="don't pluralize the module folder name",
	                    action='store_true')
	
	args = parser.parse_args()
	Modulename = args.modulename.capitalize()
	Moduleplural =  inflection.pluralize(Modulename) if not args.no_pluralize else Modulename
	modulename = Modulename.lower()
	moduleplural = Moduleplural.lower()
	template = args.template

	# Setup jinja
	env = jinja.Environment(loader=jinja.PackageLoader('goadmin', os.path.join('templates', template)))

	# Get username on unix
	user = (pwd.getpwuid(os.getuid())[4]).split(',')
	username = user[0]
	
	params_tuple = (
		('Modulename', Modulename),
		('Moduleplural', Moduleplural),
		('modulename', modulename),
		('moduleplural', moduleplural),
		('username', username)
	)
	
	params = { itm[0] : itm[1] for itm in params_tuple}
	print(params)
	
	# create module dir
	os.mkdir(moduleplural)
	os.chdir(moduleplural)
	
	# Create module
	templ_path = os.path.join(script_dir, 'templates', template)
	for root, dirs, files in os.walk(templ_path):
		# Want path relative to template dir
		root = os.path.relpath(root, templ_path)
		# Create directory structure
		for subdir in dirs:
			subdir = multi_replace(subdir, params_tuple)
			os.mkdir(os.path.join(root, subdir))
			print("Created dir", os.path.join(root, subdir))
		# Render file templates
		for subfile in files:
			newSubFile = multi_replace(subfile, params_tuple)
			newSubFile = os.path.join(root, newSubFile)
			try:
				outtext = env.get_template(os.path.join(root, subfile)).render(**params)				
				with open(newSubFile, "w") as f:
					f.write(outtext)

			except Exception as e:
				print("Error processing {}, just copying".format(os.path.join(templ_path, root, subfile)))
				shutil.copyfile(os.path.join(templ_path, root, subfile), newSubFile)
			print("Created file", newSubFile)	

