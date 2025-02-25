import React from 'react';

const RecipeDetails = ({ recipe, onEdit }) => {
  return (
    <div className="recipe-details mt-4 p-3 border rounded">
      <div className="text-center">
        <h2 className="text-center mb-1 text-success">{recipe.recipe_name}</h2>
        <div className="d-flex justify-content-between mt-5">
          <p>
            <strong>Category:</strong> {recipe?.RecipeCategory?.category || 'N/A'}
          </p>
          <p>
            <i>LCP Recipe:</i> {recipe.is_lc_recipe ? 'Yes' : 'No'}
          </p>
        </div>
      </div>

      <div>
        <p className="text-center">
          <strong>Description</strong>
        </p>
        <p>{recipe.description}</p>
      </div>

      <div>
        <p className="text-center">
          <strong>Instructions</strong>
        </p>
        <p>{recipe.instructions}</p>
      </div>

      {recipe.media && recipe.media.length > 0 ? (
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-between">
              {/* Thumbnail Section */}
              <div className="media-section mb-4" style={{ flexBasis: '100%' }}>
                <h3 className='text-center'>Thumbnail</h3>
                <div className="d-flex flex-wrap justify-content-center">
                  {recipe.media.map((m, index) =>
                    m.thumbnail_url && (
                      <div key={m.id} className="m-2" style={{ maxWidth: '350px', flex: '1 0 22%' }}>
                        <iframe
                          src={m.thumbnail_url}
                          className="img-fluid"
                          alt={`Thumbnail ${index + 1}`}
                          style={{
                            objectFit: 'cover',
                            height: '250px',
                            width: '100%',
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Image Section */}
              <div className="media-section mb-4" style={{ flexBasis: '100%' }}>
                <h3 className='text-center'>Image</h3>
                <div className="d-flex flex-wrap justify-content-center">
                  {recipe.media.map((m, index) =>
                    m.image_url && (
                      <div key={m.id} className="m-2" style={{ maxWidth: '350px', flex: '1 0 22%' }}>
                        <iframe
                          src={m.image_url}
                          className="img-fluid"
                          alt={`Image ${index + 1}`}
                          style={{
                            objectFit: 'cover',
                            height: '250px',
                            width: '100%',
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Video Section */}
              <div className="media-section mb-4" style={{ flexBasis: '100%' }}>
                <h3 className='text-center' >Video</h3>
                <div className="d-flex flex-wrap justify-content-center">
                  {recipe.media.map((m, index) =>
                    m.video_url && (
                      <div key={m.id} className="m-2" style={{ flex: '1 0 48%' }}>
                        <iframe
                          width="100%"
                          height="300"
                          src={m.video_url.replace('watch?v=', 'embed/')}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`Video ${index + 1}`}
                        ></iframe>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No media available.</p>
      )}

      <div className="mt-4">
        <p className="text-center mt-12">
          <strong>Comments</strong>
        </p>
        <p>{recipe.comments}</p>
      </div>

      <button className="btn btn-primary mt-4" onClick={() => onEdit(recipe)}>
        <i className="bi bi-pencil"></i> Edit
      </button>
    </div>
  );
};

export default RecipeDetails;
