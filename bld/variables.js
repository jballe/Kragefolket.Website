'use strict';

module.exports = {
	src: {
		vendordir: 'src/vendorwp',
		customdir: 'src/web',
		languages: 'src/vendorwp/wp/wp-content/languages',
		templatedir: 'cfg/templates/',
		exclusions: [
            // Frontend source files
			'**/*.scss',
			'**/*.less',
			'**/*.ts',
            // OS files
			'**/Thumbs.db',
			'**/.DS_Store',
            // WP default (we have our own located in root)
			'**/wp/index.php',
            // WP non-site content
			'**/licens*.*',
			'**/readme.html',
			'**/wp/index.php',
			'**/wp/wp-content/index.php',
			'**/wp-content/index.php',
			'**/changelog.txt',
			'**/.svn/**/*',
            '**/*.pot',
            // WP Unused translations
			'**/*ar.mo',
			'**/*ar.po',
			'**/*bg_bg.mo',
			'**/*bg_bg.po',
			'**/*de_de.mo',
			'**/*de_de.po',
			'**/*es_es.mo',
			'**/*es_es.po',
			'**/*fr_fr.mo',
			'**/*fr_fr.po',
			'**/*he_il.mo',
			'**/*he_il.po',
			'**/*id_id.mo',
			'**/*id_id.po',
			'**/*it_it.mo',
			'**/*it_it.po',
			'**/*ja.mo',
			'**/*ja.po',
			'**/*ko_kr.mo',
			'**/*ko_kr.po',
			'**/*nb_no.mo',
			'**/*nb_no.po',
			'**/*nl_nl.mo',
			'**/*nl_nl.po',
			'**/*pl_pl.mo',
			'**/*pl_pl.po',
			'**/*pt_br.mo',
			'**/*pt_br.po',
			'**/*ru_ru.mo',
			'**/*ru_ru.po',
			'**/*sv_se.mo',
			'**/*sv_se.po',
			'**/*vi.mo',
			'**/*vi.po',
			'**/*vi_vi.mo',
			'**/*vi_vi.po',
			'**/*zh_cn.mo',
			'**/*zh_cn.po',
			'**/*zh_tw.mo',
			'**/*zh_tw.po'
		]
	},
	dest: {
        dir: 'deploy',
		uploads: 'wp-content/uploads',
		languages: 'wp-content/languages',
		keep: [
			'wp-content/uploads',
			'wp-content/languages',
			'web.config',
			'.htaccess',
			'wp-config.php',
			'robots.txt'
		]
	},
	db: {
		dir: 'db'
	},
	config: {
		wpdebug: false,
		wplanguage: 'da_DK',
        widget: {
            sitesourcecode: 'https://github.com/jballe/Kragefolket.Website',
            siteci: 'https://snap-ci.com/jballe/Kragefolket.Website/'
        }
	}
};
