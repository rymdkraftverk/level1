import winston from 'winston';

winston.level = 'debug';

export function setLogLevel(level){
  winston.level = 'debug';
}
