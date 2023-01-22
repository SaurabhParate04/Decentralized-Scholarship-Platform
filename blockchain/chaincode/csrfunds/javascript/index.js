/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const CSRFunds = require('./lib/csrfunds');
const Scholarships = require('./lib/scholarships');

module.exports.CSRFunds = CSRFunds;
module.exports.Scholarships = Scholarships;
module.exports.contracts = [ CSRFunds, Scholarships ];
