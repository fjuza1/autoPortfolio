export const ANIMATIONTIME = 0.2;
export const DEFAULT_INTERVAL = 5;
export const EXPERT_LEVEL = ['Beginner','Basic','Skillful','Advanced','Expert'];
export const EXPERT_NUM = EXPERT_LEVEL.map((_,i)=> i + 1)
export const CATEGORIES = ['Tool','Skill','Language','Other'];
export const EXPORT_WHITELIST = ['xml', 'json', 'csv'];
export const ALLOWED_FILTER_SKILLS =  ['name','levelNumber'];
export const PROJECT_NAME = ['DMS','CMS','NSAR','SOVA','CRM','POWERAPPS', 'AUTOPORTFOLIO', 'CYPRESSDEMO'];
export const PROJECT_ORDER_NUM = PROJECT_NAME.map((_ , i) => i + 1)
export const PROJECT_DESCRIPTOR = ['a','b','c','d','e','f','g','i'];
export const SLIDES_BACKGROUND = '/public/pics/white_background.jpeg';
export const JSON_TYPE = 'application/json';
export const XML_TYPE = 'application/xml';
export const CSV_TYPE = 'text/csv';
export const SENDTO = 'filipjuzaqa@gmail.com';
export const DEFAULT_ENCODING = 'charset=utf-8';
export const ERROR_MISSING_FILENAME = 'Please provide a file name';
export const ERROR_SUPPORTED_FILE_TYPES = `Please choose a supported file type. Supported file types are: ${EXPORT_WHITELIST.join('; ')}`;
export const ERROR_ARRAY_MISSING = 'Please provide an array';
export const NAME_FILE_NAME = 'fileName'
export const FILE_TYPE_FILE = 'fileType';
export const UNGENERATED_FILE_MESSAGE = 'There was a problem generating! Please try again.'
export const SKILLSVIEW_MESSAGE = 'No skills were found! Please try again.';
export const RES_PER_PAGE_TRESHOLD = 5;
export const SECTION_REVEAL_TRESHOLD = 10;
export const CURRENT_PAGE = 1;
export const DEV_TYPE = 'Development';
export const FE_TYPE = 'Frontend tests automation';
export const BE_TYPE = 'REST API tests automation';
export const MN_TYPE = 'Manual tests';
export const SECTION_HIDDEN_CLASS = 'section--hidden'
export const STICKY_TOP_CLASS = 'sticky-top'
export const LOAD_TYPE = 'load';
export const API_TIMEOUT_SEC = 4;
export const URL_CY_DEMO = 'https://github.com/fjuza1/CypressDemo'
export const URL_PORTFOLIO_DEMO = 'https://github.com/fjuza1/portfolioCypress'