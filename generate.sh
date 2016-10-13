#! bin/bash

# Barrel Template
barrel_template() {
feature_name=$1
feature_name_lower=$(tr '[:upper:]' '[:lower:]' <<< ${feature_name:0})
printf "export * from './$feature_name_lower.component';\n"
}

# Typescript Template
typescript_template() {
feature_name=$1
feature_name_lower=$(tr '[:upper:]' '[:lower:]' <<< ${feature_name:0})
printf "import { Component, OnInit }	from '@angular/core';

@Component({
	selector: '$feature_name_lower',
	templateUrl: 'app/$feature_name_lower/$feature_name_lower.component.html'
})
export class ${feature_name}Component implements OnInit {
	message: string = 'This is ${feature_name}Component.';

	constructor() {}

	ngOnInit() {}
}\n"
}

# HTML Template
html_template() {
feature_name=$1
feature_name_lower=$(tr '[:upper:]' '[:lower:]' <<< ${feature_name:0})
printf "<section>
	<p>{{message}}</p>
</section>\n"
}

# SASS Template
sass_template() {
feature_name=$1
feature_name_lower=$(tr '[:upper:]' '[:lower:]' <<< ${feature_name:0})
printf "/* <$feature_name_lower> (app/$feature_name_lower/$feature_name_lower.component.html/ts) */
$feature_name_lower {

}\n"
}

read -r -p "Name of feature to generate (PascalCase): " feature_name
feature_name_lower=$(tr '[:upper:]' '[:lower:]' <<< ${feature_name:0})
read -r -p "Create directory in src/app named $feature_name_lower and add .scss to src/scss/features? [y/N]" response
if [[ $response =~ ^([yY][eE][sS]|[yY])$ ]]
then
    mkdir -p src/app/$feature_name_lower
	touch src/app/$feature_name_lower/$feature_name_lower.ts
	touch src/app/$feature_name_lower/$feature_name_lower.component.ts
	touch src/app/$feature_name_lower/$feature_name_lower.component.html
	touch src/scss/features/_$feature_name_lower.scss

	barrel_template $feature_name > src/app/$feature_name_lower/$feature_name_lower.ts
	typescript_template $feature_name > src/app/$feature_name_lower/$feature_name_lower.component.ts
	html_template $feature_name > src/app/$feature_name_lower/$feature_name_lower.component.html
	sass_template $feature_name > src/scss/features/_$feature_name_lower.scss

	echo "NOTE: Remember to import and declare your new component(s) in src/app/app.module.ts."
else
    return 1
fi
