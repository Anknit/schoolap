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
define('DB_NAME', 'schoolapwordpress');

/** MySQL database username */
define('DB_USER', 'schoolap_root');

/** MySQL database password */
define('DB_PASSWORD', 'schoolap123');

/** MySQL hostname */
define('DB_HOST', 'schoolapwordpress.cuyc9vxzmsv6.us-west-2.rds.amazonaws.com');

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
define('AUTH_KEY',         '?]xnVR(N]ux~>:<&n[u~;GzS$VvDzC~J)%b]H].;G2}bh(A>1vx/ez2{)Dy<CW9%');
define('SECURE_AUTH_KEY',  '*j;4VD?6F!ISsMd987O@LY)lUI!>DeWcf!8Nw+f!j.7o<ZD4v%E/dHH|v8z$zdf;');
define('LOGGED_IN_KEY',    'j]z,?&x;1D/vfBXshZ?3@8tdJ`+G=]{]CQvd~4F$6!X QJG@^/]EFNOL`16Vc_V:');
define('NONCE_KEY',        '4;02Fs{|]I(T`}RhF=lT&i02mw;9aSx)/,.}YIM3P`[Xq~DLq7J-U]HI?Yo-Q;o*');
define('AUTH_SALT',        'i)zi.D6mQF32cXgpd>?@^kYrX4)hB4r1k.rcBe3lS-YRStXO?kS;7n1u;?f0o;]Z');
define('SECURE_AUTH_SALT', '8Q]=c0?.&X|P}=!FPM!j%erk3T3z 7eGJxt~mC$g:0qqyUkA8diu>PP?yAX2<b&s');
define('LOGGED_IN_SALT',   '%*L#>_&y<g#7~Gcf:Ne-DhW@Y4;JUw>m%>vgd-:fr?`FLV@NUZc7~;lDn7+?/8MG');
define('NONCE_SALT',       'G|7v.qSL4-2D.%x2Vm+vf(C?7Hn8X n_;xhAMdG@hho$tSLc1VOreP7+RguixYjy');

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
