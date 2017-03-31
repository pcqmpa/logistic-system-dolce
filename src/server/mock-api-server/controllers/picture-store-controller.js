/**
 * Module with the picture store controller.
 * @module src/server/api-server/controllers/picture-store-controller
 */
// Node.
import path from 'path';

// Streams.
import { streams } from '../../utils/';

// Config.
import { env } from '../../../../config/';
import { PICTURES_DIR } from '../../../../config/paths';

// Constants.
import * as responses from '../../constants/responses';
import { ARGS_ABSENCE } from '../../../shared/constants/messages';

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

const saveOrderPicture = (req, res) => {
  const { picture, pictureData } = req.body;

  if (!picture || !pictureData) {
    return res
      .status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }

  return streams
    .fromBase64ToImage(
      picture, { ...pictureData, filePath: PICTURES_DIR }
    ).subscribe(
      newImage => (
        // The picture was successfully stored.
        res
          .status(responses.OK)
          .send({
            storedPath: `http://${env.HOST}:${env.SERVER_PORT}/api/picture/${newImage}`
          })
      ),
      err => (
        // There was an error while storing the file.
        res
          .status(responses.ERROR)
          .send({ err })
      )
    );
};

export default {
  getPicture,
  saveOrderPicture
};
