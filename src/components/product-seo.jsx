"use client";

import React from "react";

export function ProductSEO({ productName, productImage, productUrl, description }) {
  // Normalise to a trailing-slash URL so schema matches the canonical exactly.
  const path = productUrl ? (productUrl.endsWith('/') ? productUrl : `${productUrl}/`) : '/';
  const absoluteUrl = `https://www.mvvnaturales.com${path}`;

  // Product Schema.
  //
  // NO `offers` BLOCK ON PURPOSE. The site displays no prices — every sale is
  // quoted over WhatsApp. The previous markup shipped price "0" with
  // availability InStock, which is a false statement to Google and disqualifies
  // the page from Product rich results anyway. Do not re-add `offers` unless
  // real prices are actually published on the page.
  //
  // NO `aggregateRating` / `review` EITHER — do not add them until there are
  // genuine, user-submitted, on-page reviews. Marking up reviews that visitors
  // cannot see violates Google's structured-data policy and, on a YMYL health
  // site, risks a manual action.
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "url": absoluteUrl,
    "image": [productImage, "https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"],
    "description": description || `${productName} - Suplemento natural de MVV Natural. 100% natural, alta calidad.`,
    "category": "Suplementos alimenticios",
    "brand": {
      "@type": "Brand",
      "name": "MVV Natural"
    },
    "manufacturer": {
      "@id": "https://www.mvvnaturales.com/#organization"
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.mvvnaturales.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Productos",
        "item": "https://www.mvvnaturales.com/productos/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": productName,
        "item": absoluteUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

