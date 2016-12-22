function load(link, callback) {
	let oReq = new XMLHttpRequest();
	oReq.addEventListener('load', function() { callback.call(this); });
	oReq.open('GET', link);
	oReq.send();
}

function notFindStr(searchQuery) {
	let blackList = ['imageflake.com', 'gfycat', 'thnk1994.com', 'youtube.com', 'youtu.be', 'docs.google.com', 'flickr', 'instagram', '500px', 'pinkbike', '/a/', '/gallery/', '/r/'];
	for(let i = 0; i < blackList.length; i++) {
		if(searchQuery.indexOf(blackList[i]) > -1) { return false; }
	}
	return true;
}

function findExt(searchQuery) {
	let whiteList = ['.jpg', '.gifv', '.gif', '.png', 'shite.xyz', '.jpeg'];
	for(let i = 0; i < whiteList.length; i++) {
		if(searchQuery.indexOf(whiteList[i]) > -1) { return true; }
	}
	return false;
}

function tempAlert(msg, duration)
{
	let dialog = document.getElementById('dialog');
	let dialogContent = document.getElementById('dialog-content');
	let closeBtn = document.getElementById('close-dialog');
	dialogContent.innerHTML = msg;
	dialog.style.display = 'block';
	closeBtn.style.display = 'block';
	clearTimeout(window.timer);
	if(duration > 0) {
		closeBtn.style.display = 'none';
		window.timer = setTimeout(() => {
			dialog.style.display = 'none';
		}, duration);
	}
}