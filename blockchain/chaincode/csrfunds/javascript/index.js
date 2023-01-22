/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const CSRFunds = require('./lib/csrfunds');

module.exports.CSRFunds = CSRFunds;
module.exports.contracts = [ CSRFunds ];
