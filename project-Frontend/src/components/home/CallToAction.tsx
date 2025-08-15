import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';
import AnimatedSection from '../common/AnimatedSection';

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Solar Smarter, Not Harder?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join organizations across India that are making data-driven decisions for their solar energy investments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="secondary" 
              size="lg" 
              icon={<ArrowRight size={20} />}
            >
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-blue-700 dark:hover:bg-blue-800"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default CallToAction;