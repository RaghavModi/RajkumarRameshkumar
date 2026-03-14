import React from 'react';
import { CheckCircle } from 'lucide-react';
import { companyInfo, aboutHighlights } from '../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About {companyInfo.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your trusted partner in textile manufacturing
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1617068919530-fc28e6b6cf2d?w=800"
                alt="Manufacturing Facility"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Leading Textile Manufacturer in Ahmedabad
              </h2>
              <p className="text-gray-600 mb-4">
                {companyInfo.name} is a premier textile manufacturing company based in Ahmedabad, Gujarat, India. We specialize in producing high-quality PV (Polyester Viscose), PC (Polyester Cotton), and R/C (Rayon Cotton) fabrics.
              </p>
              <p className="text-gray-600 mb-4">
                With years of expertise in fabric production, we have established ourselves as a reliable supplier to fabric traders, garment manufacturers, uniform suppliers, wholesalers, and exporters across India and international markets.
              </p>
              <p className="text-gray-600 mb-6">
                Our commitment to quality, consistency, and customer satisfaction has made us a preferred choice for businesses seeking premium fabrics for various applications.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">ISO certified manufacturing processes</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">State-of-the-art production facilities</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">Experienced quality control team</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">Timely delivery and logistics support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Strengths
            </h2>
            <p className="text-lg text-gray-600">
              What makes us a leader in textile manufacturing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutHighlights.map((highlight, index) => (
              <Card key={index} className="bg-white text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-900">
                    {highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Capabilities */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Production Capabilities
              </h2>
              <p className="text-gray-600 mb-6">
                Our manufacturing facility is equipped with modern machinery and technology to ensure consistent quality and high production capacity. We can handle orders of all sizes, from small batch productions to large-scale bulk orders.
              </p>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Fabric Width Range</h3>
                  <p className="text-gray-600">36 inches to 58 inches - accommodating diverse garment requirements</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Product Range</h3>
                  <p className="text-gray-600">Extensive collection of PV, PC, and R/C fabrics in multiple colors and designs</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Assurance</h3>
                  <p className="text-gray-600">Rigorous testing at every stage to maintain international standards</p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?w=800"
                alt="Quality Control"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Markets We Serve */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Markets We Serve
            </h2>
            <p className="text-lg text-gray-600">
              Catering to diverse industries across domestic and international markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Fabric Traders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Supplying quality fabrics to traders across India for distribution to various markets
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Garment Manufacturers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Providing bulk fabric supply for garment production units and fashion houses
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Uniform Suppliers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Specialized fabrics for corporate, school, and industrial uniform manufacturers
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Wholesalers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Large volume supply with competitive pricing for wholesale distribution
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Exporters</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  International quality standards met for export to global markets
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg">Retailers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Flexible order quantities for fabric retail businesses
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
