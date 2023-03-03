import {
  dirtImg,
  glassImg,
  grassImg,
  logImg,
  woodImg
} from './images';
import { NearestFilter, RepeatWrapping, TextureLoader } from 'three';

export const dirtTexture = new TextureLoader().load(dirtImg);
export const glassTexture = new TextureLoader().load(glassImg);
export const grassTexture = new TextureLoader().load(grassImg);
export const logTexture = new TextureLoader().load(logImg);
export const woodTexture = new TextureLoader().load(woodImg);


grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;

dirtTexture.magFilter = NearestFilter;
glassTexture.magFilter = NearestFilter;
grassTexture.magFilter = NearestFilter;
logTexture.magFilter = NearestFilter;
woodTexture.magFilter = NearestFilter;
