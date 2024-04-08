import React, { useEffect, useState } from 'react'
import CardPanel from './CardPanel'
import { IProduct } from '../interfaces/Product';
import axios from 'axios';

const Content = () => {
  const [panel, setPanel] = useState<IProduct[] | null>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products`);
        setPanel(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Không có dữ liệu:", error);
      }
    };

    fetchProducts();
  }, []);

  if (!panel) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <>
        <section className="banner">
          <img
            src="https://picsum.photos/id/10/1440/500"
            alt=""
            className="banner__img"
          />
        </section>
        <section className="news">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-heading__title">New</h2>
            </div>
            <div className="section-body">
              <div className="product-list">
                  {panel.map((item,index)=> index < 4 &&(
                    <CardPanel product={item} key={index} />
                  ))}
              </div>
            </div>
          </div>
        </section>
        <div className="container">
          <hr />
        </div>
        {/*End .news*/}
        <section className="shop">
          <div className="container">
            <div className="section-heading">
              <h2 className="section-heading__title">Shop</h2>
            </div>
            <div className="section-body">
              <div className="shops">
                <div className="shop-item">
                  <a href="" className="shop__link">
                    <img
                      src="https://picsum.photos/id/12/665/500"
                      alt=""
                      className="shop__image"
                    />
                  </a>
                </div>
                <div className="shop-item">
                  <a href="" className="shop__link">
                    <img
                      src="https://picsum.photos/id/13/665/500"
                      alt=""
                      className="shop__image"
                    />
                  </a>
                </div>
                <div className="shop-item">
                  <a href="" className="shop__link">
                    <img
                      src="https://picsum.photos/id/14/665/500"
                      alt=""
                      className="shop__image"
                    />
                  </a>
                </div>
                <div className="shop-item">
                  <a href="" className="shop__link">
                    <img
                      src="https://picsum.photos/id/15/665/500"
                      alt=""
                      className="shop__image"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*End .shop*/}
        <section className="blog">
          <div className="container">
            <div className="section-heading section-blog-heading">
              <h2 className="section-heading__title">Blog</h2>
            </div>
            <div className="section-body">
              <div className="post-list">
                <div className="post-item">
                  <div className="post-image">
                    <a href="">
                      <img
                        src="https://picsum.photos/id/16/665/250"
                        alt=""
                        className="post__thumbnail"
                      />
                    </a>
                  </div>
                  <div className="post-info">
                    <h3 className="post__title">
                      <a href="" className="post__link">
                        THE ULTIMATE SOFA BUYING GUIDE
                      </a>
                    </h3>
                    <p className="post__excerpt">
                      The versatility of our living space is more crucial than ever.
                      But buying a sofa might be a difficult undertaking. Your needs
                      and the size of your living area will determine everything,
                      However, don’t worry, were are here to help you
                    </p>
                    <a href="" className="post__readmore">
                      Readmore
                    </a>
                  </div>
                </div>
                {/*End .post-item*/}
                <div className="post-item">
                  <div className="post-image">
                    <a href="">
                      <img
                        src="https://picsum.photos/id/17/665/250"
                        alt=""
                        className="post__thumbnail"
                      />
                    </a>
                  </div>
                  <div className="post-info">
                    <h3 className="post__title">
                      <a href="" className="post__link">
                        THE ULTIMATE SOFA BUYING GUIDE
                      </a>
                    </h3>
                    <p className="post__excerpt">
                      The versatility of our living space is more crucial than ever.
                      But buying a sofa might be a difficult undertaking. Your needs
                      and the size of your living area will determine everything,
                      However, don’t worry, were are here to help you
                    </p>
                    <a href="" className="post__readmore">
                      Readmore
                    </a>
                  </div>
                </div>
                {/*End .post-item*/}
              </div>
            </div>
          </div>
        </section>
        {/*End .blog*/}
        <section className="services">
          <div className="container-fluid">
            <div className="service-list">
              <div className="service-item">
                <img src="./public/icons/10.svg" className="service__image" />
                <div className="service-info">
                  <h4 className="service__name">High Quality</h4>
                  <p className="service__description">crafted from top materials</p>
                </div>
              </div>
              {/*End service-item*/}
              <div className="service-item">
                <img src="./public/icons/11.svg" className="service__image" />
                <div className="service-info">
                  <h4 className="service__name">High Quality</h4>
                  <p className="service__description">crafted from top materials</p>
                </div>
              </div>
              {/*End service-item*/}
              <div className="service-item">
                <img src="./public/icons/12.svg" className="service__image" />
                <div className="service-info">
                  <h4 className="service__name">High Quality</h4>
                  <p className="service__description">crafted from top materials</p>
                </div>
              </div>
              {/*End service-item*/}
              <div className="service-item">
                <img src="./public/icons/13.svg" className="service__image" />
                <div className="service-info">
                  <h4 className="service__name">High Quality</h4>
                  <p className="service__description">crafted from top materials</p>
                </div>
              </div>
              {/*End service-item*/}
            </div>
          </div>
        </section>
      </>

    </div>
  )
}

export default Content