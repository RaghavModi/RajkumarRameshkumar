import React from 'react';
import { CheckCircle, Ruler, Package } from 'lucide-react';
import { products } from '../mock';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

export const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Premium Fabric Collection
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              High-quality PV, PC & R/C fabrics with specialized sub-products for every need
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {products.map((product, index) => (
              <div key={product.id} className="border-b pb-20 last:border-b-0">
                <div
                  className={`grid lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded-lg shadow-xl w-full sticky top-24"
                    />
                  </div>

                  {/* Product Details */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                      {product.name}
                    </h2>
                    <p className="text-xl text-blue-900 mb-4">{product.fullName}</p>
                    <p className="text-gray-600 mb-6 text-lg">{product.description}</p>

                    {/* Width Range */}
                    <div className="flex items-center mb-6 bg-blue-50 p-4 rounded-lg">
                      <Ruler className="h-6 w-6 text-blue-900 mr-3" />
                      <div>
                        <p className="font-semibold text-gray-900">Fabric Width Range</p>
                        <p className="text-gray-600">{product.widthRange}</p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications */}
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Applications
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.applications.map((app, idx) => (
                          <Badge key={idx} variant="secondary" className="text-sm py-1 px-3">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Available Colors
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color, idx) => (
                          <Badge key={idx} className="bg-blue-900 text-sm py-1 px-3">
                            {color}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        + Many more colors and shades available
                      </p>
                    </div>

                    {/* Sub Products Section */}
                    {product.subProducts && product.subProducts.length > 0 && (
                      <div className="mt-8">
                        <div className="flex items-center mb-4">
                          <Package className="h-6 w-6 text-blue-900 mr-2" />
                          <h3 className="text-2xl font-bold text-gray-900">
                            Product Variants
                          </h3>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Explore our specialized {product.name} range designed for specific applications
                        </p>
                        
                        <Accordion type="single" collapsible className="w-full">
                          {product.subProducts.map((subProduct, subIdx) => (
                            <AccordionItem key={subProduct.id} value={`item-${subProduct.id}`}>
                              <AccordionTrigger className="text-left hover:no-underline">
                                <div className="flex items-center justify-between w-full pr-4">
                                  <span className="font-semibold text-lg text-gray-900">
                                    {subProduct.name}
                                  </span>
                                  <Badge variant="outline" className="ml-2">
                                    {subProduct.gsm}
                                  </Badge>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                <Card className="border-0 shadow-none bg-gray-50">
                                  <CardContent className="pt-4 space-y-4">
                                    <p className="text-gray-700">{subProduct.description}</p>
                                    
                                    {/* Blend Info */}
                                    <div className="bg-white p-3 rounded-lg">
                                      <p className="text-sm font-semibold text-gray-700">
                                        Blend Composition
                                      </p>
                                      <p className="text-blue-900 font-medium">{subProduct.blend}</p>
                                    </div>

                                    {/* Features */}
                                    <div>
                                      <p className="text-sm font-semibold text-gray-700 mb-2">
                                        Features
                                      </p>
                                      <div className="grid grid-cols-2 gap-2">
                                        {subProduct.features.map((feature, fIdx) => (
                                          <div key={fIdx} className="flex items-center text-sm">
                                            <CheckCircle className="h-4 w-4 text-green-600 mr-1.5 flex-shrink-0" />
                                            <span className="text-gray-600">{feature}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Colors */}
                                    <div>
                                      <p className="text-sm font-semibold text-gray-700 mb-2">
                                        Available Colors
                                      </p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {subProduct.colors.map((color, cIdx) => (
                                          <Badge 
                                            key={cIdx} 
                                            variant="secondary" 
                                            className="text-xs"
                                          >
                                            {color}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>

                                    {/* Applications */}
                                    <div>
                                      <p className="text-sm font-semibold text-gray-700 mb-2">
                                        Best For
                                      </p>
                                      <div className="flex flex-wrap gap-1.5">
                                        {subProduct.applications.map((app, aIdx) => (
                                          <Badge 
                                            key={aIdx} 
                                            className="bg-blue-900 text-xs"
                                          >
                                            {app}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Requirements Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Custom Requirements?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We understand that every client has unique needs. Whether you need specific colors, custom widths, or special fabric blends, we're here to help.
          </p>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl">Get in Touch</CardTitle>
              <CardDescription>
                Contact us to discuss your specific fabric requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Bulk Orders</h4>
                  <p className="text-sm text-gray-600">
                    Special pricing for large volume orders
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Custom Colors</h4>
                  <p className="text-sm text-gray-600">
                    Color matching services available
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Sample Requests</h4>
                  <p className="text-sm text-gray-600">
                    Request fabric samples before ordering
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
