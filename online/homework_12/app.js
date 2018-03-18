// Your code goes here

let root = document.getElementById('root');

let container = document.createElement('div');
container.className = 'thumbnails';

function renderAllList() {
    let head = document.createElement('h1'),
        main = root.appendChild(container),
        tanksContainer = document.createElement('div');

    head.innerHTML = 'Most popular tanks'
    tanksContainer.className = 'tank-items__wrap';

    main.appendChild(head);
    main.appendChild(tanksContainer);

    tanks.forEach(key => {
        let tankItem = document.createElement('div'),
            tankImg = document.createElement('img'),
            tankTitle = document.createElement('div'),
            tankCountryWrap = document.createElement('div'),
            tankCountry = document.createElement('img'),
            tankLevel = document.createElement('span'),
            tankName = document.createElement('span');

        tankItem.className = 'tank-item';
        tankItem.dataset.think = 'Click to details';
        tankImg.className = 'tank-img';
        tankTitle.className = 'tank-title';
        tankCountryWrap.className = 'tank-country__wrap';
        tankCountry.className = 'tank-country';
        tankCountryWrap.dataset.think = `${key.country}`;
        tankLevel.className = 'tank-level';
        tankName.className = 'tank-name';

        tankImg.src = key.preview;
        tankCountry.src = key.country_image;
        tankLevel.innerHTML = key.level;
        tankName.innerHTML = key.model;

        tankItem.appendChild(tankImg);
        tankItem.appendChild(tankTitle);
        tankCountryWrap.appendChild(tankCountry)
        tankTitle.appendChild(tankCountryWrap);
        tankTitle.appendChild(tankLevel);
        tankTitle.appendChild(tankName);

        tanksContainer.appendChild(tankItem);

        tankItem.addEventListener('click', () => {
            location.hash = key.model;
        });
    });


    function showToolTipThumbnail(event) {
        let dataHint = event.target.dataset.think;

        let hint = document.createElement('span');
        hint.classList.add('hint__thumbnail');
        hint.innerHTML = dataHint;
        event.target.appendChild(hint);
        hint.style.marginTop = '-' + (hint.clientHeight + 8) + 'px';
    }
    function hideToolTipThumbnail(event) {
        event.target.removeChild(event.target.querySelector('.hint__thumbnail'));
    }
    document.querySelectorAll('.tank-item').forEach(e => {
        e.addEventListener('mouseenter', showToolTipThumbnail);
        e.addEventListener('mouseleave', hideToolTipThumbnail);
    });

    function showToolTipCountry(event) {
        let dataHint = event.target.dataset.think.toUpperCase();
        console.log(event.target.dataset.think);
        let hint = document.createElement('span');
        hint.classList.add('hint__country');
        hint.innerHTML = dataHint;
        event.target.appendChild(hint);
        hint.style.marginBottom = '-' + (hint.clientHeight + 8) + 'px';
    }
    function hideToolTipCountry(event) {
        event.target.removeChild(event.target.querySelector('.hint__country'));
    }
    document.querySelectorAll('.tank-country__wrap').forEach(e => {
        e.addEventListener('mouseenter', showToolTipCountry);
        e.addEventListener('mouseleave', hideToolTipCountry);
    });

    return main;
}

function renderDetails(tank) {
    let tankDetails = tank.details;

    return `<div class="tank-details">
<div class="title">
<div class='title__tank-countryWrap' data-think='${tank.country}'>
    <img src='${tank.country_image}' alt="" class="title__tank-country">
</div>
    <span class="title__tank-name">${tank.model}</span>
<span class="title__tank-level">(level ${tank.level})</span>
</div>
<div class="details-content">
<div class="tank-view">
  <span class="prev">Preview</span>
  <img src=${tank.preview} alt="" class="tank-view__img">
  <span class="back_to_list">Back to list view</span>
</div>
<table class="characteristic">
  <caption>Characteristic</caption>
  <tbody>
    <tr>
      <th>damage:</th>
      <th>${tankDetails.damage}</th>
    </tr>
    <tr>
      <th>breoning:</th>
      <th>${tankDetails.breoning}</th>
    </tr>
    <tr>
      <th>attack speed:</th>
      <th>${tankDetails.attack_speed}</th>
    </tr>
    <tr>
      <th>time of targeting:</th>
      <th>${tankDetails.time_of_targeting}</th>
    </tr>
    <tr>
      <th>ammunition:</th>
      <th>${tankDetails.ammunition}</th>
    </tr>
  </tbody>
</table>
</div>
</div>`
}

function tankDetails() {
    let model = location.hash.slice(1);
    tanks.forEach(el => {
        if (el.model === model) {
            root.innerHTML = renderDetails(el);
        }
    })

    let backList = document.getElementsByClassName('back_to_list');
    backList[0].addEventListener('click', () => {
        location.hash = '';
        window.history.go();
    });

    function showToolTipCountry(event) {
        let dataHint = event.target.dataset.think.toUpperCase();
        console.log(event.target.dataset.think);
        let hint = document.createElement('span');
        hint.classList.add('hint__countryDet');
        hint.innerHTML = dataHint;
        event.target.appendChild(hint);
        hint.style.marginBottom = '-' + (hint.clientHeight + 8) + 'px';
    }
    function hideToolTipCountry(event) {
        event.target.removeChild(event.target.querySelector('.hint__countryDet'));
    }
    document.querySelectorAll('.title__tank-countryWrap').forEach(e => {
        e.addEventListener('mouseenter', showToolTipCountry);
        e.addEventListener('mouseleave', hideToolTipCountry);
    });
}

root.appendChild(renderAllList());
window.onhashchange = tankDetails;