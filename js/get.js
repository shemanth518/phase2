var idb=window.indexedDB || window.mozIndexedDB || window.msIndexedDB || window.webKitIndexedDB;
// if(!idb in window){
//   alert("Browser is not supported");
//}
var open=idb.open("sample",1);
console.log("IndexedDB is created");

open.onupgradeneeded=function(event){
var request=event.target.result;
request.createObjectStore("formdata",{keyPath:"id",autoIncrement:true});
}
open.onerror=function(error){
  console.log("object stored is not created",+error)
}
open.onsuccess=function(e){
  var request=e.target.result;
var tx=request.transaction("formdata","readwrite");
var store=tx.objectStore("formdata");
var finalData=store.getAll();
finalData.onsuccess=function(event){
console.log(event.target.result);
display(event.target.result);
}
}
function display(data){
var parent=document.querySelector(".parent");
for(var i=0; i<data.length; i++){
  var child=document.createElement("div");
  child.classList.add("child");

var image=document.createElement("img");
image.src="image/images.jpg";
image.alt=data[i].name;

var name=document.createElement("h2");
name.textContent=data[i].name;

var role=document.createElement("p");
role.textContent=data[i].role;
var mobile=document.createElement("p");
mobile.textContent=data[i].mobile;


var link=document.createElement("a");
link.href="resume.html?id="+data[i].id;
console.log(data[i].id);
link.textContent="view profile";

child.append(image);
child.append(name);
child.append(role);
child.append(mobile);
child.append(link);
parent.append(child);
}
}
