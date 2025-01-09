import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchData } from '../../hooks';
import { InterventionServices } from '../../services';

import { PageHeader } from '../../components';
import { ButtonBack, LoadingSpinner } from '../../ui';

import { PAGES } from '../../constants';

import style from './style.module.scss';

function InterventionPage() {
  const { id } = useParams();

  const { 
    TITLE, 
    DETAILS_TITLE, 
    SERVICES_TITLE, 
    PRODUCTS_TITLE, 
    COMMUNICATION_TITLE, 
    REFERENCE_NO, 
    STATUS,
    BIKE, 
    PLANNED_DATE, 
    PLANNED_DURATION, 
    COMPLETED_DATE,
    ADDRESS, 
    TOTAL 
  } = PAGES.INTERVENTION;

  const { data: intervention, isLoading: isInterventionsLoading } = useFetchData(InterventionServices.getInterventionById, [id]);
  const { data: comments, isLoading: isCommentsLoading } = useFetchData(InterventionServices.getInterventionCommentsById, [id]);
  const { data: services, isLoading: isServicesLoading } = useFetchData(InterventionServices.getInterventionServicesById, [id]);
  const { data: products, isLoading: isProductsLoading } = useFetchData(InterventionServices.getInterventionProductsById, [id]);

  const [priceServices, setPriceServices] = useState(0);
  const [priceProducts, setPriceProducts] = useState(0);

  return (
    <main className="main">
      <PageHeader title={TITLE} />
      <div className='container'>

        <ButtonBack />
        <section className={style.details}>
          <h2>{DETAILS_TITLE}</h2>
          {
            isInterventionsLoading
              ? <LoadingSpinner />
              : intervention && (
                <div className={style.detailsContainer}>
                  <p className={style.detailsItem}><span>{REFERENCE_NO}:</span> {intervention.interventionId}</p>
                  <p className={style.detailsItem}><span>{STATUS}:</span> {intervention.status}</p>
                  <p className={style.detailsItem}><span>{BIKE}:</span> {intervention.bikeNickname}</p>
                  <p className={style.detailsItem}><span>{ADDRESS}:</span> {intervention.address}</p>
                  <p className={style.detailsItem}><span>{PLANNED_DATE}:</span> {new Date(intervention.date).toLocaleString('en-GB')}</p>
                  <p className={style.detailsItem}><span>{PLANNED_DURATION}:</span> {intervention.duration}</p>
                  { intervention.startDate && intervention.endDate &&
                    <p className={style.detailsItem}><span>{COMPLETED_DATE}:</span> {new Date(intervention.startDate).toLocaleString('en-GB')} - {new Date(intervention.endDate).toLocaleString('en-GB')}</p>
                  }
                </div>
              )
          }
          <hr />
        </section>
        <section>
          <h2>{SERVICES_TITLE}</h2>
          {
            isServicesLoading
              ? <LoadingSpinner />
              : services && (
                services.map(service => <div key={service.serviceId}>{service.name} - {service.quantity} - {service.price}</div>)
              )
          }
          <h3>{TOTAL}:</h3>
          <hr />
        </section>
        <section>
          <h2>{PRODUCTS_TITLE}</h2>
          {
            isProductsLoading
              ? <LoadingSpinner />
              : products && (
                products.map(product => <div key={product.productId}>{product.name} - {product.quantity} - {product.price}</div>)
              )
          }
          <h3>{TOTAL}:</h3>
          <hr />
        </section>
        <section>
          <h2>{COMMUNICATION_TITLE}</h2>
          {
            isCommentsLoading
              ? <LoadingSpinner />
              : comments && (
                comments.map(comment => <div key={comment.commentId}>{new Date(comment.date).toLocaleString('en-Gb')} - {comment.text}</div>)
              )
          }
        </section>

      </div>
    </main>
  )
}

export default InterventionPage;