import React, { Component } from 'react';
import { MlCurrentOrders } from '../../exAllCo';
import PropTypes from 'prop-types';

const OrgCurrentOrders = ({ datePickerIcon, datePickerTitle, orderNumberTitle, orderNumberCode,
  productsIcon1, productsTitle, linkTitle, onClickDetails }) => {



  return (
    <>
      <div className='flex max-w-full h-full  flex-wrap flex-1 gap-4 my-4 '>
        <MlCurrentOrders
          datePickerIcon={datePickerIcon}
          datePickerTitle={datePickerTitle}
          orderNumberTitle={orderNumberTitle}
          orderNumberCode={orderNumberCode}
          linkTitle={linkTitle}
          onClickDetails={onClickDetails}
          productsIcon1={productsIcon1}
          productsTitle={productsTitle} />
      </div>
    </>);
}

OrgCurrentOrders.propTypes = {
  datePickerIcon: PropTypes.string,
  datePickerTitle: PropTypes.string,
  orderNumberTitle: PropTypes.string,
  orderNumberCode: PropTypes.string,
  productsIcon1: PropTypes.string,
  productsTitle: PropTypes.string,
  linkTitle: PropTypes.string,
}

export default OrgCurrentOrders;