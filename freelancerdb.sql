--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.8
-- Dumped by pg_dump version 9.6.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: collaborations; Type: TABLE; Schema: public; Owner: paologio
--

CREATE TABLE public.collaborations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    budget numeric NOT NULL,
    vat numeric NOT NULL,
    penalty numeric NOT NULL,
    date timestamp with time zone NOT NULL,
    start_hour time without time zone,
    end_hour time without time zone,
    payment numeric,
    due_date timestamp with time zone,
    sent boolean DEFAULT false,
    delay integer,
    customer_id integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer
);


ALTER TABLE public.collaborations OWNER TO paologio;

--
-- Name: collaborations_id_seq; Type: SEQUENCE; Schema: public; Owner: paologio
--

CREATE SEQUENCE public.collaborations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.collaborations_id_seq OWNER TO paologio;

--
-- Name: collaborations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: paologio
--

ALTER SEQUENCE public.collaborations_id_seq OWNED BY public.collaborations.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: paologio
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    country character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    specialization character varying(255),
    city character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    postal integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    user_id integer
);


ALTER TABLE public.customers OWNER TO paologio;

--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: paologio
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO paologio;

--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: paologio
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: paologio
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    birthdate date NOT NULL,
    country character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    postal integer NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO paologio;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: paologio
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO paologio;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: paologio
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: collaborations id; Type: DEFAULT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations ALTER COLUMN id SET DEFAULT nextval('public.collaborations_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: collaborations; Type: TABLE DATA; Schema: public; Owner: paologio
--

COPY public.collaborations (id, name, budget, vat, penalty, date, start_hour, end_hour, payment, due_date, sent, delay, customer_id, created_at, updated_at, user_id) FROM stdin;
1	Fist project	1500	60	125	2019-04-26 00:00:00+02	16:00:00	18:30:00	\N	\N	f	\N	1	2019-04-19 12:27:00.003+02	2019-04-19 12:27:00.003+02	1
2	Top Secret	200000	40000	500	2019-05-01 00:00:00+02	00:00:00	17:30:00	\N	\N	f	\N	2	2019-04-19 12:33:37.62+02	2019-04-19 12:33:37.62+02	1
\.


--
-- Name: collaborations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: paologio
--

SELECT pg_catalog.setval('public.collaborations_id_seq', 2, true);


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: paologio
--

COPY public.customers (id, name, surname, country, email, specialization, city, address, postal, created_at, updated_at, user_id) FROM stdin;
1	Robert	Customer	Customer	rob@email.com	Plumber	Cus	Customer Street, 123	7778	2019-04-19 12:26:05.444+02	2019-04-19 12:26:05.444+02	1
2	George	Buff	USA	buff@email.com	Prog	New York	Majesty Square, 1987	123456	2019-04-19 12:33:01.89+02	2019-04-19 12:33:01.89+02	1
\.


--
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: paologio
--

SELECT pg_catalog.setval('public.customers_id_seq', 2, true);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: paologio
--

COPY public.users (id, name, surname, username, email, birthdate, country, password, city, address, postal, created_at, updated_at) FROM stdin;
1	User	User	User	user@email.com	2000-01-01	Italy	$2b$12$s0u3GE5OxWlU.Askz1qWqOHedNobG4pJQ97oYqTpra29IXCEQ56Oy	Milan	User Road, 45	123456	2019-04-19 12:24:39.124+02	2019-04-19 12:24:39.124+02
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: paologio
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- Name: collaborations collaborations_pkey; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: customers_email_user_id; Type: INDEX; Schema: public; Owner: paologio
--

CREATE UNIQUE INDEX customers_email_user_id ON public.customers USING btree (email, user_id);


--
-- Name: collaborations collaborations_customer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: collaborations collaborations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.collaborations
    ADD CONSTRAINT collaborations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: customers customers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: paologio
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

