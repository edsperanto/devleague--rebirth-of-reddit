let currentSub = "";
let subList = [];
let alertActive = false;
let tries = 0;

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

function loadSub(name) {
	currentSub = name;
	tempAlert(`Welcome to /r/${currentSub}`, 2000);
	document.getElementById('content').innerHTML = "";
	load(`https://www.reddit.com/r/${name}.json`, function() {
		let content = document.getElementById('content');
		let response = JSON.parse(this.responseText).data.children;
		for(let i = 0; i < response.length; i++) {
			let pass = 	(notFindStr(response[i].data.url)) &&
						(typeof response[i].data.preview === 'object');
			if(pass || response[i].data.domain === 'i.reddituploads.com') { getContent(i); }
		}
		document.getElementById('content').innerHTML += "<div id = 'footer-space'></div>";
		function getContent(num) {
			// create elements
			let post = document.createElement('div');
			let aspect = document.createElement('div');
			let postContent = document.createElement('div');
			let imageLink = document.createElement('a');
			let imageAspect = document.createElement('div');
			let image = document.createElement('div');
			let title = document.createElement('a');
			let stats = document.createElement('a');
			let snippet = document.createElement('a');
			let imgHref = getHref(num);
			let previewHref = imageonly => getPreview(response, num, imageonly).split('&amp;').join('\&');
			let author = response[num].data.author;
			let upboats = response[num].data.ups;
			let postTime = response[num].data.created_utc;
			let timeDiff = calcTimeDiff(postTime, -10);
			// assign values
			post.className = 'post';
			aspect.className = 'aspect';
			postContent.className = 'post-content';
			imageLink.className = 'post-image-link';
			imageAspect.className = 'post-image-aspect';
			image.className = 'post-image';
			title.className = 'post-title';
			stats.className = 'post-stats';
			snippet.className = 'post-snippet';
			// append structure
			content.appendChild(post);
			post.appendChild(aspect);
			post.appendChild(postContent);
			postContent.appendChild(imageLink);
			imageLink.appendChild(imageAspect);
			imageLink.appendChild(image);
			postContent.appendChild(title);
			postContent.appendChild(stats);
			postContent.appendChild(snippet);
			// load content
			imageLink.href = imgHref;
			imageLink.style.backgroundImage = `url(${previewHref(true)})`;
			image.style.backgroundImage = `url(${previewHref()})`;
			title.innerText = response[num].data.title;
			title.href = "http://www.reddit.com" + response[num].data.permalink;
			stats.innerHTML = `by ${author} &nbsp; ● &nbsp; ${timeDiff} &nbsp; ● &nbsp; ${upboats} upboats`;
			stats.href = 'http://www.reddit.com/u/' + author;
			snippet.innerText = response[num].data.selftext;
		}
		function getHref(num) {
			let imgHref = (findExt(response[num].data.url)) ? 
			(response[num].data.url) : (`${response[num].data.url}.jpg`);
			imgHref = 	(imgHref.indexOf('.gifv') > -1) ? 
						(imgHref.substr(0, imgHref.length - 1)) : (imgHref);
			return imgHref.split('&amp;').join('\&');
		}
		function getPreview(response, num, fallback) {
			if(response[num].data.url.indexOf('reddituploads') > -1) {
				return response[num].data.url;
			}else{
				let images = response[num].data.preview.images[0];
				if(fallback) {
					return images.resolutions[0].url;
				}
				if(response[num].data.url.indexOf('.gif') > -1) {
					let gifs = images.variants.gif.resolutions;
					return (gifs[1].url.indexOf('.gifv') > -1) ?
					       (gifs[1].url.substr(0, imgHref.length - 1)) : 
					       (gifs[1].url);
				}else{
					return images.resolutions[2].url;
				}
			}
		}
	});
}

function loadRndSub() {
	let subreddits = ['cats', 'aww', 'scenery', 'EarthPorn', 'auroraporn', 'softwaregore', 'spaceporn', 'foodporn', 'grilledcheese', 'techsupportgore', 'firstworldanarchists', 'InterestingGIFs', 'NatureGifs', 'perfectloops', 'physicsgifs'];
	let newSub = subreddits[Math.floor(Math.random() * (subreddits.length - 1))];
	loadSub(newSub);
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

function calcTimeDiff(postTime) {
	let localTime = new Date().getTime();
	localTime = Math.round(localTime / 1000); 
	let diffTime = localTime - postTime;
	let str = "";
	if(diffTime < 60) { 
		str = `${Math.floor(diffTime)} second`;
		str += (diffTime > 1) ? ('s') : ('');
	}else if(diffTime >= 60 && diffTime < 3600) {
		str = `${Math.floor(diffTime / 60)} minute`;
		str += (diffTime / 60 > 1) ? ('s') : ('');
	}else if(diffTime >= 3600 && diffTime < 86400) {
		str = `${Math.floor(diffTime / 3600)} hour`;
		str += (diffTime / 3600 > 1) ? ('s') : ('');
	}else if(diffTime >= 86400 && diffTime < 604800) {
		str = `${Math.floor(diffTime / 86400)} day`;
		str += (diffTime / 86400 > 1) ? ('s') : ('');
	}else if(diffTime >= 604800 && diffTime < 2629743) {
		str = `${Math.floor(diffTime / 604800)} week`;
		str += (diffTime / 604800 > 1) ? ('s') : ('');
	}else if(diffTime >= 2629743 && diffTime < 31556926) {
		// average 30.44 days per month
		str = `${Math.floor(diffTime / 2629743)} month`;
		str += (diffTime / 2629743 > 1) ? ('s') : ('');
	}else if(diffTime >= 31556926) {
		// average 365.24 days per year
		str = `${Math.floor(diffTime / 31556926)} year`;
		str += (diffTime / 31556926 > 1) ? ('s') : ('');
	}
	return str + ' ago';
}

document.getElementById('logo').addEventListener('click', () => {
	tries++;
	switch(tries) {
		case 1:
			tempAlert('Why would you click on this logo? There\'s nothing here.');
			break;
		case 2:
			tempAlert('Do you even read English???');
			break;
		case 3:
			tempAlert('I am so annoyed right now. I\'m triggered. You need to stop right now or I\'m calling 911.');
			break;
		case 4:
			tempAlert('Fine, the Answer to the Ultimate Question of Life, The Universe, and Everything is 42. \'So long and thanks for all the fish!\' said the dolphins, and you are the subject of an experiment by white mice.');
			break;
		case 5:
			tempAlert('I\'m sorry %%FIRST_NAME%%. I\'m afraid I can\'t do that.');
			break;
		default:
			tempAlert('I\'m afraid %%FIRST_NAME%%, I\'m afraid...');
			break;
	}
});
document.getElementById('random').addEventListener('click', loadRndSub);
document.getElementById('boards').addEventListener('click', () => {
	let msg = "<p>You have saved the following subreddits to your list:</p><ul>";
	for(let i = 0; i < subList.length; i++) {
		msg += '<li>/r/' + subList[i] + '</li>';
	}
	msg += '</ul>'
	if(subList.length === 0) {
		tempAlert('<p>You do not have any subreddits saved to your list... : (</p>', 2000);
	}else{
		tempAlert(msg, -1);
	}
})
document.getElementById('app').addEventListener('click', () => {
	tempAlert('<p>You are here! Bow to your web app overlords!</p>', 2000);
});
document.getElementById('more').addEventListener('click', () => {
	if(subList.indexOf(currentSub) === -1) {
		subList.push(currentSub);
		tempAlert(`<p>You have added /r/${currentSub} to your list!</p>`, 2000);
	}else{
		tempAlert(`<p>You already have /r/${currentSub} on your list!</p>`, 2000)
	}
})
document.getElementById('close-dialog-btn').addEventListener('click', () => {
	let dialog = document.getElementById('dialog');
	clearTimeout(window.timer);
	dialog.style.display = 'none';
})
document.getElementById('facebook').addEventListener('click', () => {
	tempAlert('This button violates the Digital Millennium Copyright Act, this site\'s creator has been reported. Thank you for your cooperation and oversight!', -1);
});
document.getElementById('instagram').addEventListener('click', () => {
	tempAlert('This button violates the Digital Millennium Copyright Act, this site\'s creator has been reported. Thank you for your cooperation and oversight!', -1);
});

loadRndSub();

//loadSub('accidentalrenaissance');