import { useParams } from 'react-router-dom';

import { useFetchData } from '../../hooks';
import { InterventionServices } from '../../services';

import { PageHeader } from '../../components';
import { ButtonBack, LoadingSpinner } from '../../ui';

import { PAGES } from '../../constants';


function InterventionPage() {
  const { id } = useParams();

  const { TITLE } = PAGES.INTERVENTION;

  const { data: intervention, isLoading: isInterventionsLoading } = useFetchData(InterventionServices.getInterventionById, [id]);
  const { data: comments, isLoading: isCommentsLoading } = useFetchData(InterventionServices.getInterventionCommentsById, [id]);
  const { data: services, isLoading: isServicesLoading } = useFetchData(InterventionServices.getInterventionServicesById, [id]);
  const { data: products, isLoading: isProductsLoading } = useFetchData(InterventionServices.getInterventionProductsById, [id]);

  return (
    <main className="main">
      <PageHeader title={TITLE} />
      <div className='container'>

        <ButtonBack />
        <section>
          <h2>Details</h2>
          {
            isInterventionsLoading
              ? <LoadingSpinner />
              : intervention && (

                <p>{intervention.interventionId}</p>
              )
          }
          <hr/>
        </section>
        <section>
          <h2>Services selected</h2>
          {
            isServicesLoading
              ? <LoadingSpinner />
              : services && (
                services.map(service => <div key={service.serviceId}>{service.name} - {service.quantity} - {service.price}</div>)
              )
          }
          <hr/>
        </section>
        <section>
          <h2>Product added</h2>
          {
            isProductsLoading
              ? <LoadingSpinner />
              : products && (
                products.map(product => <div key={product.productId}>{product.name} - {product.quantity} - {product.price}</div>)
              )
          }
          <hr/>
        </section>
        <section>
          <h2>Communication</h2>
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