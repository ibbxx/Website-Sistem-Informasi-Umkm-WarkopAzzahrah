
import React from 'react';

const Contact: React.FC = () => {
  const phoneNumber = "6287777347983"; // Nomor WhatsApp Baru
  const displayPhone = "+62 877-7734-7983";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Halo%20Warkop%20Azzahra,%20saya%20ingin%20bertanya%20mengenai%20menu%20dan%20pemesanan.`;

  return (
    <section id="kontak" className="py-20 bg-stone-950 text-white border-t border-stone-800">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-amber-500 font-serif">Hubungi & Kunjungi Kami</h2>
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Info Section */}
          <div className="lg:w-1/2 w-full text-center lg:text-left space-y-10">
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400 font-serif">Alamat</h3>
              <p className="text-stone-300 font-light tracking-wide">Jl. Kopi Nikmat No. 123<br/>Jakarta, Indonesia</p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400 font-serif">Jam Buka</h3>
              <p className="text-stone-300 font-light tracking-wide">Senin - Minggu<br/>08:00 - 22:00 WIB</p>
            </div>

            {/* WhatsApp Section */}
            <div>
                <h3 className="text-2xl font-semibold mb-4 text-amber-400 font-serif">Pemesanan & Info</h3>
                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(22,163,74,0.4)] hover:shadow-[0_0_25px_rgba(22,163,74,0.6)] group"
                >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    <span>Pesan via WhatsApp: {displayPhone}</span>
                </a>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-3 text-amber-400 font-serif">Ikuti Kami</h3>
              <p className="text-stone-300 mb-4 max-w-md mx-auto lg:mx-0 font-light">
                Jangan lewatkan update terbaru, promo menarik, dan momen-momen seru di Warkop Azzahra. Ikuti kami di Instagram!
              </p>
              <div className="flex justify-center lg:justify-start space-x-4">
                <a href="#" aria-label="Instagram" className="text-stone-400 hover:text-amber-500 transition-colors duration-300 transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.148-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.502.012-4.72.068-2.693.123-3.993 1.423-4.116 4.116-.056 1.218-.067 1.578-.067 4.72s.011 3.502.067 4.72c.123 2.693 1.423 3.993 4.116 4.116 1.218.056 1.578.067 4.72.067s3.502-.011 4.72-.067c2.693-.123 3.993-1.423 4.116-4.116.056-1.218.067-1.578.067-4.72s-.011-3.502-.067-4.72c-.123-2.693-1.423-3.993-4.116-4.116-1.218-.056-1.578-.068-4.72-.068zm0 5.467c-1.956 0-3.57 1.614-3.57 3.57s1.614 3.57 3.57 3.57 3.57-1.614 3.57-3.57-1.614-3.57-3.57-3.57zM12 15a3 3 0 110-6 3 3 0 010 6zm6.363-8.87a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="text-stone-400 hover:text-amber-500 transition-colors duration-300 transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
                </a>
              </div>
            </div>
          </div>
          {/* Map Section */}
          <div className="lg:w-1/2 w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.577218945283!2d106.8249646153942!3d-6.187333995520298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f43534033321%3A0x7ac471374003d72b!2sMonumen%20Nasional!5e0!3m2!1sen!2sid!4v1678886543210!5m2!1sen!2sid"
              className="w-full h-full rounded-lg shadow-lg border border-stone-700 opacity-90 hover:opacity-100 transition-opacity"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Warkop Azzahra"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
