import React, { useEffect, useState } from 'react';
import { OrgCheque, OrgOpenInvoices, OrgPurchaseAmount, MlFinanCial } from '../../exAllCo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPurchaseAmount, fetchOpenInvoices, fetchChequeData } from '../../../redux/financial/financialSlice';
import { setFinancialTabItem } from '../../../redux/persist/publicPersist';
export default function OrgFinanCial() {
  const dispatch = useDispatch();
  const financialTabItem = useSelector((state) => state.publicPersist.financialTabItem)

  useEffect(() => {
  if (financialTabItem === '1') {
      dispatch(fetchPurchaseAmount())
    }
    if (financialTabItem === '2') {
      dispatch(fetchChequeData())
    }
    if (financialTabItem === '3') {
      dispatch(fetchOpenInvoices())
    }
  }, [financialTabItem]);



  return (
    <div>
      <MlFinanCial isActive={financialTabItem} Element="tabHeader" onClickItemI={() => dispatch(setFinancialTabItem('1'))} onClickItemII={() => dispatch(setFinancialTabItem('2'))} onClickItemIII={() => dispatch(setFinancialTabItem('3'))} />
      {financialTabItem === '1' ? <OrgPurchaseAmount /> : financialTabItem === '2' ? <OrgCheque /> : financialTabItem === '3' ? <OrgOpenInvoices /> : null}
    </div>
  )
}
