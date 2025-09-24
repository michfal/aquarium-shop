-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  description text,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.product_images (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  product_id bigint,
  alt text,
  bucket text NOT NULL DEFAULT 'product-images'::text,
  path text NOT NULL,
  is_primary boolean NOT NULL DEFAULT false,
  sort integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT product_images_pkey PRIMARY KEY (id),
  CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id)
);
CREATE TABLE public.products (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  category_id bigint,
  name text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0::numeric),
  sku text UNIQUE,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  slug text UNIQUE,
  image text,
  CONSTRAINT products_pkey PRIMARY KEY (id),
  CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id)
);