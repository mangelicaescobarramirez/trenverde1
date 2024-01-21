import { Link } from "react-router-dom";

function Maqueta() {
  return (
    <div>
      {/* Header */}
      <header className="bg-neutral-300  flex items-center">
        
      <div className="flex mb-4">
  <div className="flex-1">
    <img
      src="src/components/logotren.jpg" // Reemplaza con la ruta correcta de tu imagen
      alt="Descripción de la imagen"
      className="rounded-md"
      width="200" // Puedes ajustar este valor según tus necesidades
    />
  </div>
</div>
  <div className="flex-0  mb-4" > {/* Añadí ml-4 para dar un poco de espacio entre la imagen y el texto */}
    <h1 className="text-5xl py-2 font-bold text-neutral-600 ">Tren verde  </h1>
    <p className="text-md  text-center text-neutral-600" style={{ marginLeft: '0px' }}>
    Empresa de venta de plantas y insumos 
    </p>
    <div className="flex-1 mb-0">
    <br></br>
<Link

            to="/"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            IR A INICIO
          </Link>




    </div>
  </div>
</header>

     



      {/* Services Section */}
      <section className="bg-gray-200 flex items-center ">
  <div className="text-center w-full">
    <h2 className="text-3xl font-bold mb-4"> </h2>
    <div className="flex flex-wrap justify-center">
      {/* Add individual service items here */}
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <h3 className="text-xl font-bold mb-2"></h3>
        <p></p>
        <img src="src/components/campo.jpg" alt="Descripción de la imagen" width="150" className="mx-auto rounded-full mt-4" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <h3 className="text-xl font-bold mb-2"></h3>
        <p></p>
        <img src="src/components/logo-producto1.png" alt="Descripción de la imagen" width="200" className=" mx-auto rounded-full mt-4" />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/3 p-4">
        <h3 className="text-xl font-bold mb-2"></h3>
        <p>.</p>
        <img src="src/components/logo-producto2.png" alt="Descripción de la imagen" width="200" className="mx-auto mt-4" />
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section className="bg-white p-10">
        <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
        <div className="flex flex-wrap">
          {/* Add individual testimonial items here */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <blockquote className="text-lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </blockquote>
            <p className="text-gray-600">- Client 1</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <blockquote className="text-lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </blockquote>
            <p className="text-gray-600">- Client 2</p>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 p-4">
            <blockquote className="text-lg">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            </blockquote>
            <p className="text-gray-600">- Client 3</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Maqueta;
