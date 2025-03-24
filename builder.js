const esbuild = require('esbuild');
const postcss = require('postcss');
const fs = require('fs');
const path = require('path');

// Función para crear el directorio si no existe
function createDirIfNotExists(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true }); // Crear directorio y subdirectorios si no existen
	}
}

// Función para compilar JavaScript con esbuild
function buildJS() {
	// Leer todos los archivos JS en /src/js/
	const jsFiles = fs
		.readdirSync('./src/js')
		.filter((file) => file.endsWith('.js'));

	const entryPoints = jsFiles.map((file) => `./src/js/${file}`);

	esbuild
		.build({
			entryPoints: entryPoints, // Entradas dinámicas para todos los archivos JS
			bundle: true, // Agrupar todo el código en un solo archivo
			minify: true, // Minificar el JS
			outdir: './dist/js', // Directorio de salida para los archivos JS minificados
		})
		.then(() => {
			console.log('JavaScript compilado con éxito');
		})
		.catch((error) => {
			console.error('Error al compilar JavaScript:', error);
		});
}

// Función para minificar múltiples archivos CSS con PostCSS usando cssnano
function minifyCSS() {
	// Leer todos los archivos CSS en /src/css/
	const cssFiles = fs
		.readdirSync('./src/css')
		.filter((file) => file.endsWith('.css'));

	// Crear el directorio dist/css si no existe
	createDirIfNotExists('./dist/css');

	cssFiles.forEach((file) => {
		const cssFilePath = `./src/css/${file}`; // Ruta de cada archivo CSS
		const cssOutputPath = `./dist/css/${path.basename(file, '.css')}.min.css`; // Salida con el sufijo .min.css

		fs.readFile(cssFilePath, 'utf8', (err, css) => {
			if (err) {
				console.error(`Error al leer el archivo CSS ${file}:`, err);
				return;
			}

			postcss([require('cssnano')()])
				.process(css, { from: cssFilePath, to: cssOutputPath })
				.then((result) => {
					fs.writeFile(cssOutputPath, result.css, (err) => {
						if (err) {
							console.error(
								`Error al escribir el archivo CSS minificado ${file}:`,
								err
							);
						} else {
							console.log(`CSS minificado con éxito: ${file}`);
						}
					});
				})
				.catch((error) => {
					console.error(`Error al minificar el CSS ${file}:`, error);
				});
		});
	});
}

// Ejecutar ambas funciones
buildJS();
minifyCSS();
