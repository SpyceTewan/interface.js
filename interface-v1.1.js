class GuiObject {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.enabled = true;
		this.blinking = false;
		this.blinkingTime = 0;
		this.blinkingSpeed = 100;
	}

	update(){
		if(this.isEnabled()){
			if(this.isBlinking()){
				this.blinkingTime++;

				if(this.blinkingTime >= this.blinkingSpeed){
					this.display();

					if(this.blinkingTime >= this.blinkingSpeed * 2){
						this.blinkingTime = 0;
					}
				}

			}else{
				this.display();
			}
		}
	}

	display(){
		Gui.styleDefault(this);
		this.style();
	}

	style(){

	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
	}

	setStyle(func){
		this.style = func;
	}

	setBlinkingSpeed(arg){
		this.blinkingSpeed = arg;
	}

	setBlinking(arg){
		this.blinking = arg;
	}

	isEnabled(){
		return this.enabled;
	}

	isBlinking(){
		return this.blinking;
	}

	enable(){
		this.enabled = true;
	}

	disable(){
		this.enabled = false;
	}

	toggle(){
		this.enabled = !this.isEnabled();
	}
}

class GuiTextObject extends GuiObject {
	setText(text){
		this.text = text;
	}

	setTextSize(size){
		this.size = size;
	}

	display(){
		super.display();
		if(this.size != undefined){
			Gui.changeTextSize(this.size);
		}
	}
}

class GuiSelectable extends GuiObject {

	constructor(x, y){
		super(x, y);

		this.nextObject = -1;
		this.previousObject = -1;
	}

	display(){
		super.display();
		if(this.isSelected()){
			Gui.styleSelected(this);

			Gui.displayText(Gui.selectedPrefix + this.text + Gui.selectedSuffix, this.x, this.y);
		}else {
			Gui.styleUnselected(this);

			Gui.displayText(this.text, this.x, this.y);
		}
	}

	isSelected(){
		return this.selected;
	}

	setNext(obj){
		this.nextObject = obj;
	}

	setPrevious(obj){
		this.previousObject = obj;
	}	
}

class GuiRunnable extends GuiSelectable {
	setRunnable(arg){
		this.func = arg;
	}

	run(){
		this.func(this);
	}
}

class GuiButton extends GuiRunnable {

	setText(text){
		this.text = text;
	}

	display(){
		super.display();
	}
}

class GuiText extends GuiTextObject {
	display(){
		super.display();

		Gui.displayText(this.text, this.x, this.y);
	}
}

class GuiPanel {

	constructor(){
		this.objects = [];
		this.textFunction = null;
	}

	add(object){
		this.objects.push(object);
	}

	select(arg){
		if(arg != -1){

			if(this.selected != null){
				this.selected.selected = false;
			}

			this.selected = arg;
			this.selected.selected = true;
		}
	}

	update(){
		this.objects.forEach( function(element, index) {
			element.update();
		});
	}

	press(){
		if(this.selected instanceof GuiRunnable){
			this.selected.run();
		}
	}	
}

let Gui = [];
Gui.activePanel;
Gui.selectedSuffix = "";
Gui.selectedPrefix = "";

Gui.styleSelected = function(){

}

Gui.styleUnselected = function(){

}

Gui.styleDefault = function(){

}

Gui.selectedSuffix = "";

Gui.selectedPrefix = "";

Gui.setPanel = function(arg){
	Gui.activePanel = arg;
}

Gui.setStyleSelected = function(arg){
	Gui.styleSelected = arg;
}

Gui.setStyleUnselected = function(arg){
	Gui.styleUnselected = arg;
}

Gui.setStyleDefault = function(arg){
	Gui.styleDefault = arg;
}

Gui.setSelectedSuffix = function(suffix){
	Gui.selectedSuffix = suffix;
}

Gui.setSelectedPrefix = function(prefix){
	Gui.selectedPrefix = prefix;
}

Gui.setTextFunction = function(arg){
	Gui.displayText = arg;
}

Gui.setTextSizeFunction = function(arg){
	Gui.changeTextSize = arg;
}

Gui.confirm = function(){
	Gui.activePanel.press();
}

Gui.update = function(){
	Gui.activePanel.update();
}

Gui.selectNext = function(){
	Gui.activePanel.select(Gui.activePanel.selected.nextObject);
}

Gui.selectPrevious = function(){
	Gui.activePanel.select(Gui.activePanel.selected.previousObject);
}
