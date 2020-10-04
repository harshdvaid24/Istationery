/**
 * Created by Dima Portenko on 14.05.2020
 */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductMedia from './ProductMedia';
import { getProductMedia } from '../../actions';

export const ProductMediaContainer = ({ product, selectedProductSku }) => {
  const current = useSelector(({ product }) => (product.current));
  const dispatch = useDispatch();
  console.log("current:",current);
  useEffect(() => {
    const { media_gallery_entries } = current[product.id].product || {};
    console.log("media_gallery_entries:",media_gallery_entries);

    if (!media_gallery_entries || !media_gallery_entries[product.sku]) {
      dispatch(getProductMedia({ sku: product.sku, id: product.id }));
    }
  }, []); // eslint-disable-line

  const { media_gallery_entries } = current[product.id].product;
  if (!media_gallery_entries) {
    console.log("!media_gallery_entries:",media_gallery_entries);
    return (
      <ProductMedia media={null} />
    );
  }
  if (selectedProductSku && media_gallery_entries[selectedProductSku]) {
    console.log("media_gallery_entries:",media_gallery_entries);
    return (
      <ProductMedia media={media_gallery_entries[selectedProductSku]} />
    );
  }
  console.log("last media_gallery_entries:",media_gallery_entries);
  return (
    <ProductMedia media={media_gallery_entries} />
  );
};
