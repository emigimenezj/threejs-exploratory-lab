import {
  dirtImg,
  glassImg,
  grassImg,
  logImg,
  woodImg
} from './images';

import { NearestFilter, RepeatWrapping, TextureLoader } from 'three';

export const dirt = new TextureLoader().load(dirtImg);
export const glass = new TextureLoader().load(glassImg);
export const grass = new TextureLoader().load(grassImg);
export const log = new TextureLoader().load(logImg);
export const wood = new TextureLoader().load(woodImg);

grass.wrapS = RepeatWrapping;
grass.wrapT = RepeatWrapping;

dirt.magFilter = NearestFilter;
glass.magFilter = NearestFilter;
grass.magFilter = NearestFilter;
log.magFilter = NearestFilter;
wood.magFilter = NearestFilter;
