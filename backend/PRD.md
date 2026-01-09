# Product Requirements Document (PRD)
# Darte Marketplace Platform (Full Project)

## 1. Overview

### 1.1 Purpose
Build a full-stack marketplace platform that connects buyers and sellers. The system includes a Next.js frontend, a NestJS backend, and integrations for payments, messaging, notifications, and admin control.

### 1.2 Vision
Enable sellers to list products and engage with buyers, while providing buyers a fast, trustworthy shopping experience with real-time communication and transparent order tracking.

### 1.3 Goals
- Deliver a complete buyer journey: discover -> message -> purchase -> track.
- Provide sellers with onboarding, product management, subscription billing, and order handling.
- Ensure secure, reliable payments with revenue splitting and auditability.
- Support real-time messaging and notifications.
- Offer admin tools for approvals, moderation, and operations.

### 1.4 Non-Goals
- Building a public marketplace API for third parties.
- Custom payment UIs beyond gateway requirements.
- Full-scale marketing automation (email flows beyond notifications).
- Native mobile apps (future phase).

### 1.5 Success Metrics
- 99.9% uptime for core APIs and checkout.
- <300ms p95 response time for catalog and product pages.
- <2s p95 messaging delivery for WebSockets.
- <1% checkout failure rate caused by platform errors.
- Zero critical security findings at launch.

## 2. Personas and Roles

### 2.1 Personas
- Buyer: browses products, messages sellers, places orders.
- Seller: lists products, manages orders, responds to messages.
- Admin: approves sellers, moderates content, handles disputes.

### 2.2 Role Permissions
- Buyer: manage profile, cart, orders, and messaging.
- Seller: manage products, orders, messaging, subscription status.
- Admin: full access to users, sellers, products, orders, payments, and reports.

## 3. Scope and Features

### 3.1 Buyer Experience (Frontend + Backend)
- Browse categories, search, filter, and sort products.
- View product detail pages with ratings and reviews (phase 2).
- Add to cart, checkout, and order confirmation.
- Message sellers before and after purchase.
- Notifications for orders, payment status, and messages.

### 3.2 Seller Experience (Frontend + Backend)
- Seller onboarding and admin approval.
- Subscription payment ($5/month) and renewal handling.
- Seller dashboard for product CRUD and order management.
- Messaging inbox for buyer communication.
- Payout and revenue split visibility.

### 3.3 Admin Experience (Backend + Admin UI)
- Approve or reject seller accounts.
- Manage users, products, and orders.
- Review disputes, refunds, and content moderation.
- Operational oversight for payments and subscriptions.

### 3.4 Core Platform Capabilities
- Authentication with JWT and bcrypt.
- Role-based access control for all endpoints.
- File uploads for product images.
- Payments integration (Paystack or Stripe).
- Messaging with WebSockets and REST fallback.
- Notification delivery (in-app first; email phase 2).

## 4. Functional Requirements

### 4.1 Authentication and Authorization
- Register, login, logout, password reset.
- JWT access tokens; optional refresh tokens.
- RBAC enforced on every endpoint.

### 4.2 Product Catalog
- Product listing, filtering, pagination.
- Seller product management (create/update/delete).
- Image uploads to cloud storage.
- Ratings and reviews (optional phase 2).

### 4.3 Cart and Checkout
- Add/update/remove cart items.
- Checkout flow that creates a payment and order.
- Order status tracking and history.

### 4.4 Payments and Subscriptions
- Integration with Paystack or Stripe.
- Payment initiation and verification via webhook.
- Seller subscription billing with status tracking.
- 90/10 revenue split stored per order.

### 4.5 Messaging
- Buyer <-> seller conversations.
- Message history and pagination.
- WebSocket real-time delivery with REST fallback.

### 4.6 Notifications
- Order status updates.
- Payment confirmation alerts.
- New message notifications.
- Mark read/unread.

### 4.7 Admin Controls
- Seller approval workflow.
- Product moderation and takedown.
- Order refund or cancellation flow.
- Access to platform metrics and audit logs.

## 5. Non-Functional Requirements

### 5.1 Security
- CORS, Helmet, rate limiting.
- Input validation and sanitization.
- OWASP Top 10 mitigations.
- Audit log for admin actions.

### 5.2 Performance
- Pagination on all list endpoints.
- Indexing for catalog and order queries.
- Caching for read-heavy endpoints (phase 2).

### 5.3 Reliability
- Idempotent webhook handling.
- Retry strategy for external calls.
- Graceful degradation if WebSocket is unavailable.

### 5.4 Scalability
- Horizontal scaling for API services.
- WebSocket scaling with Redis adapter (phase 2).

## 6. System Architecture

### 6.1 Frontend (Next.js + Tailwind CSS)
- App routing for home, category, product, cart, checkout, profile, and seller dashboard.
- Shared UI components: Navbar, Footer, Search, Product Cards.
- Role-based rendering for user/seller/admin.
- Responsive design for mobile, tablet, desktop.

### 6.2 Backend (NestJS + MongoDB/PostgreSQL)
- Modular architecture (auth, users, sellers, products, orders, payments, messaging).
- REST APIs for all client interactions.
- Optional GraphQL in future.

### 6.3 Integrations
- Payment gateway: Paystack or Stripe.
- Storage: S3-compatible for images.
- Email: SendGrid or SES (phase 2).

## 7. Data Model (High Level)

### 7.1 Entities
- User: id, name, email, role, passwordHash, status, createdAt.
- Seller: id, userId, businessInfo, status, subscriptionId.
- Product: id, sellerId, title, description, price, images, category, status.
- Order: id, buyerId, items, total, status, paymentId, revenueSplit.
- Subscription: id, sellerId, plan, status, renewalDate, paymentRef.
- Message: id, conversationId, senderId, body, createdAt.
- Notification: id, userId, type, payload, isRead, createdAt.
- Payment: id, provider, reference, status, amount, metadata.

### 7.2 Database Strategy
- MongoDB: flexible for catalog and messaging.
- PostgreSQL: strong consistency for orders and payments.
- Final decision required early; hybrid optional if complexity justified.

## 8. API Surface (High Level)

### 8.1 Authentication
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout

### 8.2 Users and Sellers
- GET /users/me
- PATCH /users/me
- POST /sellers/onboard
- GET /sellers/me
- PATCH /sellers/me
- POST /sellers/subscribe
- GET /sellers/subscription

### 8.3 Products
- GET /products
- GET /products/:id
- POST /products
- PATCH /products/:id
- DELETE /products/:id

### 8.4 Orders and Checkout
- POST /cart
- PATCH /cart
- POST /checkout
- GET /orders
- GET /orders/:id
- PATCH /orders/:id/status

### 8.5 Payments
- POST /payments/initiate
- POST /payments/webhook
- GET /payments/:id

### 8.6 Messaging
- GET /conversations
- GET /conversations/:id/messages
- POST /conversations/:id/messages
- WS /ws/messages

### 8.7 Notifications
- GET /notifications
- PATCH /notifications/:id/read

### 8.8 Admin
- GET /admin/users
- GET /admin/sellers
- PATCH /admin/sellers/:id/approve
- GET /admin/orders
- PATCH /admin/orders/:id/refund

## 9. Frontend Requirements

### 9.1 Core Pages
- Home, Category, Product Details.
- Cart, Checkout, Order Confirmation.
- Login, Register, Forgot Password, Profile.
- Seller Dashboard: products, orders, subscription.

### 9.2 UI Components
- Product grid, product card, rating display.
- Cart drawer or page with live updates.
- Messaging UI (conversation list and chat view).
- Notifications dropdown or page.

### 9.3 UX Requirements
- Fully responsive on mobile/tablet/desktop.
- Clear calls to action for purchase and messaging.
- Subtle animations for transitions and state changes.

## 10. Observability and Ops

### 10.1 Logging and Monitoring
- Structured logs (JSON).
- Error tracking via Sentry.
- Metrics for latency, error rate, throughput.

### 10.2 Deployment
- Environment config via .env.
- CI pipeline for lint/test/build (phase 2).
- Staging and production environments.

## 11. Team Responsibilities

### 11.1 Backend Lead (Developer 1)
- Core API architecture and modules.
- Database models for Users, Products, Orders, Sellers, Subscriptions, Messages.
- File uploads and cloud storage integration.
- Security middleware and deployment readiness.

### 11.2 Backend Developer 2
- Auth and seller logic.
- RBAC enforcement.
- Seller onboarding and subscription flow.
- Payment verification for subscriptions.

### 11.3 Backend Developer 3
- Cart/checkout/order APIs.
- Payment gateway integration and revenue split.
- Messaging and WebSocket path.
- Notifications for orders, payments, messages.

### 11.4 Frontend Lead (Developer 1)
- App structure, routing, layout, and core UI.
- Home, category, product detail pages.
- Global components and navigation.

### 11.5 Frontend Developer 2
- Auth pages and profile.
- Seller dashboard UI and subscription UI.
- Role-based UI rendering and messaging inbox.

### 11.6 Frontend Developer 3
- Cart, checkout, order confirmation.
- Messaging UI and notifications UI.
- Responsive styling and animations.

## 12. Risks and Open Questions
- Database choice: MongoDB vs PostgreSQL vs hybrid.
- Payment provider selection and regional coverage.
- WebSocket scaling and reliability.
- Subscription lifecycle and proration handling.
- Refund policy and dispute resolution flows.

## 13. Milestones (Suggested)
- M1: Auth, roles, onboarding, core backend structure.
- M2: Product catalog, seller dashboard, image uploads.
- M3: Cart, checkout, payments, order flow.
- M4: Messaging, notifications, WebSockets.
- M5: Admin tools, observability, hardening.

## 14. Acceptance Criteria
- End-to-end buyer purchase flow works and is tested.
- Sellers can onboard, subscribe, list products, and fulfill orders.
- Admin can approve sellers and moderate content.
- Payments are verified by webhooks and recorded accurately.
- Messaging works in WebSocket and REST fallback.
- Notifications are delivered and can be marked read.
