/**
 * Module with the picture store controller.
 * @module src/server/api-server/controllers/picture-store-controller
 */
// Streams.
import { streams } from '../../utils/';

// Config.
import { env } from '../../../../config/';
import { PICTURES_DIR } from '../../../../config/paths';

// Constants.
import * as responses from '../../constants/responses';
import { PICTURE_EXTENSION } from '../../constants/values';
import { ARGS_ABSENCE, SYSTEM_ERROR } from '../../../shared/constants/messages';

const getPicture = (req, res) => {
  const { pictureName } = req.params;
  if (!pictureName) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  const options = {
    root: PICTURES_DIR,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  return res.sendFile(pictureName, options, (err) => {
    if (err) {
      return res
        .status(responses.ERROR)
        .send({ err });
    }
    return true;
  });
};

const savePicture = (req, res) => {
  const { picture } = req.files;

  if (!picture) {
    return res
      .status(responses.ERROR)
      .send({ message: ARGS_ABSENCE });
  }

  try {
    const [pictureData] = picture;
    const imageData = {
      extension: PICTURE_EXTENSION,
      filePath: PICTURES_DIR
    };

    return streams
      .fromBufferToImage(pictureData, imageData)
      .subscribe(
        (newImage) => {
          // The picture was successfully stored.
          return res
            .status(responses.OK)
            .send({
              storedPath: `http://${env.HOST}:${env.SERVER_PORT}/api/picture/${newImage}`
            });
        },
        (err) => {
          // There was an error while storing the file.
          res
            .status(responses.ERROR)
            .send({ err });
        }
      );
  } catch (e) {
    return res
      .status(responses.ERROR)
      .send({ message: SYSTEM_ERROR });
  }
};

export default {
  getPicture,
  savePicture
};
