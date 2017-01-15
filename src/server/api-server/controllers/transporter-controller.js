/**
 * Module with transporter controllers.
 * @module src/server/api-server/controllers/transporter-controller
 */
// Services.
import { transporterServices } from '../services';

// Constants.
import * as responses from '../../constants/responses';
import {
  ARGS_ABSENCE,
  EXTERNAL_SERVER_ERROR
} from '../../../shared/constants/messages';

const callGetTransporters = (req, res) => (
  transporterServices
    .getTransportersRequest()
      .subscribe(
        data => (
          // Responds with the transporter master list.
          res.status(responses.OK).send({ data })
        ),
        err => (
          res.status(responses.ERROR).send({
            err,
            serverMessage: EXTERNAL_SERVER_ERROR
          })
        )
      )
);

const callAssignTransporter = (req, res) => {
  const { idUser, idTransporter } = req.body;
  if (!idUser || !idTransporter) {
    return res.status(responses.ERROR)
      .send({ err: ARGS_ABSENCE });
  }
  return transporterServices
    .assignTransporterRequest(idUser, idTransporter)
      .subscribe(
        message => (
          // The user was successfully assigned.
          res
            .satus(responses.OK)
            .send({ message })
        ),
        err => (
          // There was an external server error.
          res
            .status(responses.ERROR)
            .send({ err })
        )
      );
};

const callAssignDistributor = (req, res) => {
  console.log('REQUEST');
  res.status(responses.OK).send({ message: 'HI' });
  // const { idTransporter, idDistributor } = req.body;
  // if (!idTransporter || !idDistributor) {
  //   return res.status(responses.ERROR)
  //     .send({ err: ARGS_ABSENCE });
  // }
  // return transporterServices
  //   .assignDistributorRequest(idDistributor, idTransporter)
  //     .subscribe(
  //       message => (
  //         // The user was successfully assigned.
  //         res
  //           .satus(responses.OK)
  //           .send({ message })
  //       ),
  //       err => (
  //         // There was an external server error.
  //         res
  //           .status(responses.ERROR)
  //           .send({ err })
  //       )
  //     );
};

export default {
  callGetTransporters,
  callAssignTransporter,
  callAssignDistributor
};
