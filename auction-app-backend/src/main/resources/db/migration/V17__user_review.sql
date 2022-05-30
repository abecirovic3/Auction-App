CREATE SEQUENCE IF NOT EXISTS user_review_sequence START WITH 1 INCREMENT BY 1;

CREATE TABLE user_review
(
    id          BIGINT   NOT NULL,
    user_id     BIGINT   NOT NULL,
    reviewer_id BIGINT   NOT NULL,
    rating      SMALLINT NOT NULL,
    CONSTRAINT pk_user_review PRIMARY KEY (id)
);

ALTER TABLE user_review
    ADD CONSTRAINT user_review_unique UNIQUE (user_id, reviewer_id);

ALTER TABLE user_review
    ADD CONSTRAINT FK_USER_REVIEW_ON_REVIEWER FOREIGN KEY (reviewer_id) REFERENCES app_user (id);

ALTER TABLE user_review
    ADD CONSTRAINT FK_USER_REVIEW_ON_USER FOREIGN KEY (user_id) REFERENCES app_user (id);