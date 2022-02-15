let currentDroppable = null;
let num = 0, idTree = 0;
let masDrop = [];

let clientWidth = document.documentElement.clientWidth;
document.getElementById("field").style.left = clientWidth*0.37+"px";
let tree = document.getElementById("0");
masDrop[0] = 0;
tree.addEventListener('mousedown', treeDown);

function treeDown(event) {
	let tree = event.path[0];
	let shiftX = event.clientX - tree.getBoundingClientRect().left;
	let shiftY = event.clientY - tree.getBoundingClientRect().top;

	moveAt(event.pageX, event.pageY);

	function moveAt(pageX, pageY) {
		tree.style.left = pageX - shiftX + 'px';
		tree.style.top = pageY - shiftY + 'px';
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	document.addEventListener('mousemove', onMouseMove);

	tree.addEventListener('mouseup', function(event) {
		document.removeEventListener('mousemove', onMouseMove);
		tree.onmouseup = null;
		
		let X = tree.style.left.replace('px','');
		X = Number(X);
		let Y = tree.style.top.replace('px','');
		Y = Number(Y);
		let fieldLeft = clientWidth*0.37-25;
		let id = Number(tree.id);
		
		if(Y<5||Y>490||X<fieldLeft||X>fieldLeft+445) {
			tree.remove();
			if(masDrop[id]!=0) {
				masDrop[id] = 0;
				leaveDroppable();				
			}
		} else {
			if(masDrop[id]!=1) {
				masDrop[id] = 1;
				enterDroppable();			
			}			
		}
		if(Number(event.path[0].id)==idTree) {
			let tree2 = document.createElement("div");
			tree2.className = "tree";
			tree2.id = ++idTree;
			document.body.append(tree2);
			tree2.addEventListener('mousedown', treeDown);
			tree2.ondragstart = function() {
			  return false;
			};
			masDrop[idTree] = 0;
		}
	});
}

function enterDroppable() {
	if(document.body.getElementsByTagName("h1")[0]==undefined) {
		num++;					
		let h1 = document.createElement("h1");
		h1.innerText = "Вы посадили первое дерево!";
		let elem = document.getElementById("field");
		document.body.insertBefore(h1, elem);
	} else {
		num++;
		document.body.getElementsByTagName("h1")[0].innerText = "Деревьев посажено: "+num;
	}
}

function leaveDroppable() {
	if(document.body.getElementsByTagName("h1")[0]!=undefined) {
		num--;
		if(num<=0) {
			document.body.getElementsByTagName("h1")[0].remove();
		} else {
			document.body.getElementsByTagName("h1")[0].innerText = "Деревьев посажено: "+num;
		}
	}
}

tree.ondragstart = function() {
  return false;
};