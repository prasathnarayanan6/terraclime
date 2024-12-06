--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2024-11-29 16:36:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 98671)
-- Name: flow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flow (
    device_id character varying(15) NOT NULL,
    flow integer,
    "timestamp" timestamp with time zone
);


ALTER TABLE public.flow OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 98678)
-- Name: leaks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.leaks (
    device_id character varying(15) NOT NULL,
    flat_id character varying(15),
    leaks character varying(10)
);


ALTER TABLE public.leaks OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 98697)
-- Name: price; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.price (
    price character varying(20),
    "timestamp" timestamp with time zone
);


ALTER TABLE public.price OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 98685)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    apartment_id character varying(10),
    flat_id character varying(10),
    device_id character varying(10),
    r_name character varying(30),
    r_whatsapp_number bigint NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 4848 (class 0 OID 98671)
-- Dependencies: 215
-- Data for Name: flow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.flow (device_id, flow, "timestamp") FROM stdin;
4	1	2024-11-07 17:38:26.727439+05:30
A2276	1	2024-11-07 17:38:56.139514+05:30
A2276	1	2024-11-07 17:46:50.468997+05:30
A2276	1	2024-11-07 17:46:56.11134+05:30
B2276	1	2024-11-07 17:47:34.916229+05:30
SHA22	2	2024-11-09 13:52:06.87767+05:30
\.


--
-- TOC entry 4849 (class 0 OID 98678)
-- Dependencies: 216
-- Data for Name: leaks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.leaks (device_id, flat_id, leaks) FROM stdin;
SHA22	SHA2201	0
\.


--
-- TOC entry 4851 (class 0 OID 98697)
-- Dependencies: 218
-- Data for Name: price; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.price (price, "timestamp") FROM stdin;
\.


--
-- TOC entry 4850 (class 0 OID 98685)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (apartment_id, flat_id, device_id, r_name, r_whatsapp_number) FROM stdin;
\.


--
-- TOC entry 4700 (class 2606 OID 98684)
-- Name: leaks leaks_flat_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaks
    ADD CONSTRAINT leaks_flat_id_key UNIQUE (flat_id);


--
-- TOC entry 4702 (class 2606 OID 98682)
-- Name: leaks leaks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.leaks
    ADD CONSTRAINT leaks_pkey PRIMARY KEY (device_id);


--
-- TOC entry 4704 (class 2606 OID 98689)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (r_whatsapp_number);


-- Completed on 2024-11-29 16:36:10

--
-- PostgreSQL database dump complete
--

