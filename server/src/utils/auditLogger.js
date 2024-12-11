import prisma from '../config/prismaClient.js';
import logger from './logger.js';

/**
 * Logs an action to the AuditTrail table.
 *
 * @param {Object} options - Logging options
 * @param {String} options.actorID - The user performing the action
 * @param {String} options.action - The type of action ('CREATE', 'UPDATE', 'DELETE')
 * @param {String} options.tableName - The name of the table where the action occurred
 * @param {String} options.recordId - The ID of the affected record
 * @param {Object} [options.previousData] - The previous data before the action (optional)
 * @param {Object} [options.newData] - The new data after the action (optional)
 */
export const logAuditTrail = async ({
  actorID,
  action,
  tableName,
  recordId,
  newData = null,
  previousData = null,
}) => {
  try {
    await prisma.auditTrail.create({
      data: {
        actor: {
          connect: {
            userID: actorID,
          },
        },
        action,
        tableName,
        recordId,
        previousData,
        newData,
        // previousData: previousData ? JSON.stringify(previousData) : null,
        // newData: newData ? JSON.stringify(newData) : null,
      },
    });
  } catch (error) {
    logger.error(error, 'Error in audit logging');
  }
};
