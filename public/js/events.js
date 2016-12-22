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
		msg += `<li class = 'saved'> &nbsp; - /r/${subList[i]}</li>`;
	}
	msg += '</ul>'
	if(subList.length === 0) {
		tempAlert('<p>You do not have any subreddits saved to your list... : (</p>', 2000);
	}else{
		tempAlert(msg, -1);
		for(let i = 0; i < subList.length; i++) {
			let savedSub = document.getElementsByClassName('saved')[i];
			savedSub.addEventListener('click', function() { loadSub(subList[i], true); });
			savedSub.style.cursor = 'pointer';
		}
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
document.addEventListener('scroll', function (event) {
    if (document.body.scrollHeight == document.body.scrollTop + window.innerHeight) {
    	if(scrollConfirm) {
    		loadSub(currentSub, false);
    	}else{
    		scrollConfirm = true;
    	}
    }
});