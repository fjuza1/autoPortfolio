export const ANIMATIONTIME = 0.2;
export const EXPERT_LEVEL = ['Beginner','Basic','Skillful','Advanced','Expert'];
export const EXPERT_NUM = EXPERT_LEVEL.map((_,i)=> i + 1)
export const CATEGORIES = ['Tool','Skill','Language','Other'];
export const EXPORT_WHITELIST = ['xml', 'json', 'csv'];
export const ALLOWED_FILTER_SKILLS =  ['name','levelNumber'];
export const PROJECT_NAME = ['DMS','CMS','NSAR','SOVA','CRM','POWERAPPS'];
export const PROJECT_ORDER_NUM = PROJECT_NAME.map((_ , i) => i + 1)
export const PROJECT_DESCRIPTOR = ['a','b','c','d','e','f'];
export const PROJECT_TAGS = ['Manual Testing','Automation Testing','Development','Automation tests demo'];
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
export const SKILLSVIEW_MESSAGE = 'No skills were found! Please try again.'