#! bin/bash

# Barrel Template
barrel_template() {
feature_name=$1
printf "export * from './$feature_name.component';\n"
}

# Typescript Template
typescript_template() {
feature_name=$1
printf "import { Component, OnInit }	from '@angular/core';

@Component({
	selector: '$feature_name',
	templateUrl: 'app/$feature_name/$feature_name.component.html'
})
export class $(tr '[:lower:]' '[:upper:]' <<< ${feature_name:0:1})${feature_name:1}Component implements OnInit {
	message: string = 'This is a feature named $feature_name.';

	constructor() {}

	ngOnInit() {}
}\n"
}

# HTML Template
html_template() {
feature_name=$1
printf "<section>
	<p>{{message}}</p>
</section>\n"
}

# SASS Template
sass_template() {
feature_name=$1
printf "/* <$feature_name> (app/$feature_name/$feature_name.component.html/ts) */\n"
}

read -r -p "Name of feature to generate (lowercase): " feature_name
feature_name=$(tr '[:upper:]' '[:lower:]' <<< ${feature_name:0})
read -r -p "Create directory in src/app named $feature_name and add .scss to src/scss/features? [y/N]" response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
    mkdir -p src/app/$feature_name
	touch src/app/$feature_name/$feature_name.ts
	touch src/app/$feature_name/$feature_name.component.ts
	touch src/app/$feature_name/$feature_name.component.html
	# touch src/scss/features/_$feature_name.scss

	barrel_template $feature_name > src/app/$feature_name/$feature_name.ts
	typescript_template $feature_name > src/app/$feature_name/$feature_name.component.ts
	html_template $feature_name > src/app/$feature_name/$feature_name.component.html
	# sass_template $feature_name > src/scss/features/_$feature_name.scss

	echo "NOTE: Remember to import and declare your new component(s) in src/app/app.module.ts."
else
    return 1
fi
