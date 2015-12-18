/* Copyright 2015 Teem2 LLC. Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.  
   You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0 Unless required by applicable law or agreed to in writing, 
   software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, 
   either express or implied. See the License for the specific language governing permissions and limitations under the License.*/


define.class(function(require, $ui$, view, checkbox,foldcontainer,  label, button, scrollbar,textbox, numberbox,$widgets$, colorpicker, radiogroup){
	this.attributes = {
		target:{type:String,value:""},
		property:{type:Object},
		value:{type:Object},
		propertyname:{type:String,value:""},
		fontsize: {type:float, value: 13}
	}
	
	this.bg = {
		color:function(){								
			var col1 = vec3("#505050");
			var col2=vec3("#505050");
			return vec4(mix(col1, col2, 1.0-pow(abs(uv.y),4.0) ),1.0)
		}
	};
	
	this.margin = 0;
	this.padding = 0;
	this.border = 0;
	this.flexdirection = "row";
	this.flex = 1;
	this.bordercolor = "gray";
	this.fgcolor = "#c0c0c0" 
	this.wrap = function(node, hasownlabel){
		if (hasownlabel === undefined) hasownlabel = false		
		if (hasownlabel) return [node];
		
		return [
			label({bg:0,margin:4, fontsize:this.fontsize, flex: 0.2, text:this.propertyname, bg:0, fgcolor:this.fgcolor })
			,node
		]	
	}
	
	this.render = function(){
		
		var typename = this.property.type?this.property.type.name:"";
		var meta = (this.property.meta)?this.property.meta:"";
		
		if (typename =="Enum"){
			return this.wrap(radiogroup({title:this.propertyname,values:this.property.type.values, currentvalue: this.value}), true);
		}
		
		if (typename =="vec4"){
		
			if (this.property.meta=="color"){
				return this.wrap(				
					foldcontainer({fontsize:this.fontsize, width:302, title:"colorpicker",  bordercolor:"#383838", icon:"circle", collapsed:true, basecolor:vec4(this.value[0],this.value[1],this.value[2],1.0)},view({bg:0,width:300, flexdirection:"column"},colorpicker({value:this.value})))
				)
			}
			
			return this.wrap(
				view({bg:0},
					numberbox({flex:1, align:"right",decimals:3, stepvalue:0.01, fontsize:this.fontsize, value:this.value[0],margin:2}), 
					numberbox({flex:1, align:"right",decimals:3, stepvalue:0.01, fontsize:this.fontsize, value:this.value[1],margin:2}), 
					numberbox({flex:1, align:"right",decimals:3, stepvalue:0.01, fontsize:this.fontsize, value:this.value[2],margin:2}), 
					numberbox({flex:1, align:"right",decimals:3, stepvalue:0.01, fontsize:this.fontsize, value:this.value[3],margin:2})
				)
			);
		}
		
		if (typename =="vec3"){
			return this.wrap(
				view({bg:0},
					numberbox({flex:1, fontsize:this.fontsize,decimals:3, stepvalue:0.01, value:this.value[0], margin:2}), 
					numberbox({flex:1, fontsize:this.fontsize,decimals:3, stepvalue:0.01, value:this.value[1], margin:2}), 
					numberbox({flex:1, fontsize:this.fontsize,decimals:3, stepvalue:0.01, value:this.value[2], margin:2})
				)
			);
		}
		
		if (typename =="vec2"){
			return this.wrap(
				view({bg:0},
					numberbox({flex:1, fontsize:this.fontsize,decimals:3, stepvalue:0.01, value:this.value[0],margin:2}), 
					numberbox({flex:1, fontsize:this.fontsize,decimals:3, stepvalue:0.01, value:this.value[1],margin:2})
				)
			);            
		}
		
		if (typename =="FloatLike"){
			return this.wrap(
				view({bg:0},
					numberbox({flex:1, fontsize:this.fontsize,decimals:3, stepvalue:0.01, value:this.value, stepvalue:0.1, margin:2}) 
				)
			)
		}
		
		if (typename =="IntLike"){
			return this.wrap(
				view({bg:0},
					numberbox({flex:1, fontsize:this.fontsize, value:this.value, stepvalue:1, margin:2}) 
				)
			)
		}
		
		if (typename =="String"){			
			return this.wrap(
				view({bg:0},
					textbox({flex:1, fontsize:this.fontsize, fgcolor:"#d0d0d0",bgcolor:"#505050", value:this.value,padding:4, borderradius:0, borderwidth:1, bordercolor:"gray", margin:2})
				) 
			)
		}
		
		if (typename =="Boolean" || typename=="BoolLike"){
			return this.wrap(
				view({bg:0},
					checkbox({flex:1, fgcolor:"#308030", value:this.value,padding:4, borderradius:0, borderwidth:1, bordercolor:"gray", margin:2})
				) 
			)
		}
		
		if (typename == "Object" && meta == "font") {
			return this.wrap(
				label({fontsize: this.fontsize, margin:4,text:"FONT PICKER!", bg:0, fgcolor:this.fgcolor})
			)			
		}

		if (typename == "Object" && meta == "texture") {
			return this.wrap(
				label({fontsize: this.fontsize, margin:4,text:"IMAGE PICKER!", bg:0, fgcolor:this.fgcolor})
			)
		}
		
		if (!this.property) return [];
		//console.log(this.property);
		return this.wrap(label({margin:4,text:typename + " " + meta, bg:0, fgcolor:this.fgcolor}))
	}
	
})