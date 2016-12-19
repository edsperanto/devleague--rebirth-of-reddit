function load(link, callback) {
	oReq = new XMLHttpRequest();
	oReq.addEventListener('load', function() { callback.call(this); });
	oReq.open('GET', link);
	oReq.send();
}

function notFindStr(searchQuery) {
	let blackList = ['imageflake.com'/*, 'i.reddituploads.com'*/, 'thnk1994.com', 'youtube.com', 'youtu.be', 'docs.google.com', 'flickr', 'instagram', '500px', 'pinkbike', '/a/', '/gallery/', '/r/'];
	for(let i = 0; i < blackList.length; i++) {
		if(searchQuery.indexOf(blackList[i]) > -1) { return false; }
	}
	return true;
}

function findExt(searchQuery) {
	let whiteList = ['.jpg', '.gifv', '.gif', '.png', 'shite.xyz', '.jpeg', 'reddituploads'];
	for(let i = 0; i < whiteList.length; i++) {
		if(searchQuery.indexOf(whiteList[i]) > -1) { return true; }
	}
	return false;
}

function loadSub(name) {
	document.getElementById('content').innerHTML = "";
	load(`https://www.reddit.com/r/${name}.json`, function() {
		let content = document.getElementById('content');
		let response = JSON.parse(this.responseText).data.children;
		for(let i = 0; i < response.length; i++) {
			let pass = 	(notFindStr(response[i].data.url)) &&
						(typeof response[i].data.preview === 'object');
			if(pass || response[i].data.domain === 'i.reddituploads.com') { getContent(i); }
		}
		function getContent(num) {
			let post = document.createElement('div');
			let aspect = document.createElement('div');
			let postContent = document.createElement('div');
			let imageLink = document.createElement('a');
			let image = document.createElement('div');
			let title = document.createElement('a');
			let stats = document.createElement('a');
			let snippet = document.createElement('a');
			let imgHref = 
				(findExt(response[num].data.url)) ? 
				(response[num].data.url) : (`${response[num].data.url}.jpg`);
			imgHref = 	(imgHref.indexOf('.gifv') > -1) ? 
						(imgHref.substr(0, imgHref.length - 1)) : (imgHref);
			let previewHref = getPreview(response, num);
			post.className = 'post';
			aspect.className = 'aspect';
			postContent.className = 'post-content';
			image.className = 'post-image';
			title.className = 'post-title';
			stats.className = 'post-stats';
			snippet.className = 'post-snippet';
			imageLink.href = imgHref;
			image.style.backgroundImage = `url(${previewHref})`;
			content.appendChild(post);
			post.appendChild(aspect);
			post.appendChild(postContent);
			postContent.appendChild(imageLink);
			imageLink.appendChild(image);
		}
		function getPreview(response, num) {
			if(response[num].data.domain === 'i.reddituploads.com') {
				let tempStr = "";
				for(let i = 0; i < response[num].data.url.length; i++) {
					if(response[num].data.url.charAt(i) === '&') {
						tempStr += '\&';
						i += 4;
					}else{
						tempStr += response[num].data.url.charAt(i);
					}
				}
				return tempStr;
			}else{
				let images = response[num].data.preview.images[0];
				if(response[num].data.url.indexOf('.gif') > -1) {
					let gifs = images.variants.gif.resolutions;
					return gifs[0]; // high-def: gifs.length - 1
				}else{
					return images.resolutions[0]; // high-def: images.resolutions.length - 1
				}
			}
		}
	});
}

function loadRndSub() {
	let subreddits = ['cats', 'aww', 'EarthPorn', 'auroraporn', 'softwaregore', 'spaceporn', 'foodporn', 'grilledcheese', 'techsupportgore', 'firstworldanarchists']
	loadSub(subreddits[Math.floor(Math.random() * (subreddits.length - 1))]);
}

document.getElementById('random').addEventListener('click', loadRndSub);
document.getElementById('app').addEventListener('click', function() {
	alert('You are here!')
});

//loadRndSub();

loadSub('scenery');