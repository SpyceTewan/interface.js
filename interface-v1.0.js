class GuiObject {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	display(){
		Gui.styleDefault();
	}

	setPosition(x, y){
		this.x = x;
		this.y = y;
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
		this.func();
	}
}
	
class GuiText extends GuiTextObject {
	display(){
		super.display();

		Gui.displayText(this.text, this.x, this.y);
	}
}

class GuiTextBlinking extends GuiTextObject {

	constructor(x, y){
		super(x, y);

		this.time = 0;
		this.enabled = true;
	}

	setSpeed(speed){
		this.speed = speed;
	}

	enable(){
		this.enabled = true;
	}

	disable(){
		this.enabled = false;
	}

	isEnabled(){
		return this.enabled;
	}

	display(){
		super.display();

		if(this.enabled){
			this.time++;
			if(this.time >= this.speed){

				Gui.displayText(this.text, this.x, this.y);

				if(this.time >= this.speed * 2){
					this.time = 0;
				}
			}
		}
	}

}

class GuiButton extends GuiRunnable {

	setText(text){
		this.text = text;
	}

	display(){
		super.display();

		if(this.isSelected()){
			Gui.styleSelected();

			Gui.displayText(selectedPrefix + this.text + selectedSuffix, this.x, this.y);
		}else {
			Gui.styleUnselected();

			Gui.displayText(this.text, this.x, this.y);
		}
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

	update(x, y){
		this.mouse = {x, y};
		for(let i = 0; i < this.objects.length; i++){
			this.objects[i].display();
		}
	}

	press(){
		if(this.selected instanceof GuiRunnable){
			this.selected.run();
		}
	}	
}

let activePanel;
let selectedSuffix = "";
let selectedPrefix = "";
class Gui {

	static setPanel(arg){
		activePanel = arg;
	}

	static styleSelected(){
		
	}

	static styleUnselected(){

	}

	static styleDefault(){

	}

	static setStyleSelected(arg){
		Gui.styleSelected = arg;
	}

	static setStyleUnselected(arg){
		Gui.styleUnselected = arg;
	}

	static setStyleDefault(arg){
		Gui.styleDefault = arg;
	}

	static setSelectedSuffix(suffix){
		selectedSuffix = suffix;
	}

	static setSelectedPrefix(prefix){
		selectedPrefix = prefix;
	}

	static displayText(){
		console.log("Please give Gui.js a text function to work with. Use Gui.setTextFunction(arg)! arg must be a function with the following parameters: (text, x, y)");
	}

	static changeTextSize(){

	}

	static setTextFunction(arg){
		Gui.displayText = arg;
	}

	static setTextSizeFunction(arg){
		Gui.changeTextSize = arg;
	}

	static confirm(){
		activePanel.press();
	}

	static update(x, y){
		activePanel.update(x, y);
	}

	static selectNext(){
		activePanel.select(activePanel.selected.nextObject);
	}

	static selectPrevious(){
		activePanel.select(activePanel.selected.previousObject);
	}
}

