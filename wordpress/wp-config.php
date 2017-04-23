<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
// define('WP_CACHE', true); //Added by WP-Cache Manager
// define( 'WPCACHEHOME', 'C:\wamp\www\schoolap\trunk\wordpress\wp-content\plugins\wp-super-cache/' ); //Added by WP-Cache Manager
define('DB_NAME', 'schoolapwordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root123');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '*Gs:;c*j}uJ^P1>u6$Vw!~]tL-#8b2B0kD8l(ajviOu.6SVlj}k=9yPJ]2`kqEH-');
define('SECURE_AUTH_KEY',  'EP&u 0^Nt+3SJB~xfX(Wfke0](O2#]Yy^uDeY=s~7CjD;D#L^QqO@HwH]; W3,[&');
define('LOGGED_IN_KEY',    'vpV/krX,5*dl)bLS#J9^KW[Iox78Hz7D/e!w+ow1&SM!I2,~D7;i%n8|I0Z.iuLu');
define('NONCE_KEY',        'W8(XiM$&W#Bx&08Vis;#&v,$Y<ufTvW Q@z4)J#_>QG#(2l]bA$iHjzQ>$aa9y$D');
define('AUTH_SALT',        'w+$?l@,.*z/-Ov?|.hMTf_#Gi]^qUpwlklx_8rcoUl/i7,U]FjF=x^0c;hgr(t<b');
define('SECURE_AUTH_SALT', 'lL;ZmWKKVa&S^sJD<L+O2MsVMEltQk7v|6/&HW{@FyW8P_S[RtV=U?_;>UQab/.T');
define('LOGGED_IN_SALT',   'yRuR?{~?W-Xi?YBAG*RtXEz`R;aFZp:![gR$uBhowoAbc=(>h#4qg.LLALS8VYZg');
define('NONCE_SALT',       '^# Pd0u&O05O?|c:y5<>WB-l%PO*P;Y`m32Heu%!y.9/:l$Ctv1{3()()qgDu 4J');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
