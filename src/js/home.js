document.addEventListener('DOMContentLoaded', function () {
	let hrefBase = window.location.pathname.includes('/en')
		? '/en/producto'
		: '/producto';

	document
		.querySelectorAll('.section-resumen-modulos_tabs-content-text_link')
		.forEach((div) => {
			let hrefData = div.getAttribute('data-url');
			div.addEventListener(
				'click',
				() => (window.location.href = hrefBase + hrefData)
			);
		});

	/*** Variantes de Hero Section ***/
	const hero = document.querySelector('.container-hero');
	const heroElement = document.querySelector('.section_hero');
	const randomNum = Math.floor(Math.random() * 3) + 1;

	let hero_variant_name;
	switch (randomNum) {
		case 2:
			hero_variant_name = 'Zoom_Image';
			hero.classList.remove('section_hero_vr_2');
			break;
		case 3:
			hero_variant_name = 'Cropped_Image';
			hero.classList.remove('section_hero_vr_2');
			hero.classList.add('section_hero_vr_3');
			break;
		default:
			hero_variant_name = 'No_Image';
	}

	hero.id = hero_variant_name;
	heroElement.classList.add('hero-animation');

	requestAnimationFrame(() => {
		setTimeout(() => {
			heroElement.classList.remove('hero-animation');
			heroElement.style.opacity = '1';
			heroElement.style.minHeight = 'auto';
		}, 1000);
	});

	if (window.clarity) {
		window.clarity('set', 'Hero_Test', hero_variant_name);
	}

	/*** Prevención de envío de formularios con Enter ***/
	document.body.addEventListener('keydown', function (event) {
		if (event.key === 'Enter' && event.target.tagName === 'INPUT') {
			event.preventDefault();
		}
	});

	/*** Zoom en imágenes ***/
	document.querySelectorAll('.bp-com-image-zoom').forEach((container) => {
		const mainImage = container.querySelector('.bp-com-image-zoom_main-img');
		const modal = container.querySelector('.bp-com-image-zoom_modal');
		const modalImage = container.querySelector('.bp-com-image-zoom_modal-img');
		const containerModalImage = container.querySelector(
			'.bp-com-image-zoom_modal_container'
		);

		if (!mainImage || !modal || !modalImage || !containerModalImage) return;

		function zoom(event) {
			const rect = container.getBoundingClientRect();
			let x, y;

			if (event.touches) {
				x = ((event.touches[0].clientX - rect.left) / rect.width) * 100;
				y = ((event.touches[0].clientY - rect.top) / rect.height) * 100;
				modalImage.style.transform = 'scale(2)';
			} else {
				x = ((event.clientX - rect.left) / rect.width) * 100;
				y = ((event.clientY - rect.top) / rect.height) * 100;
				modalImage.style.transform = 'scale(1.2)';
			}
			modalImage.style.transformOrigin = `${x}% ${y}%`;
		}

		function resetZoom() {
			modalImage.style.transform = 'scale(1)';
			modalImage.style.transformOrigin = 'center center';
		}

		containerModalImage.addEventListener('mousemove', zoom);
		containerModalImage.addEventListener('mouseleave', resetZoom);
		containerModalImage.addEventListener('touchmove', zoom);
		containerModalImage.addEventListener('touchend', resetZoom);

		mainImage.addEventListener('click', () => {
			document.body.style.overflow = 'hidden';
			modalImage.src = mainImage.src;
			modal.style.display = 'flex';
		});

		modal.addEventListener('click', () => {
			modal.style.display = 'none';
			document.body.style.overflow = 'auto';
		});
	});
});
